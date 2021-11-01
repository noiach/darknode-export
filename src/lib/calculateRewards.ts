import BigNumber from "bignumber.js";
import moment from "moment";

import { Provider } from "@ethersproject/providers";

import { AbiItem } from "./abiItem";
import { TypedEvent } from "./ABIs/common";
import DarknodeRegistryABI from "./ABIs/DarknodeRegistry.json";
import { DARKNODE_REGISTRY } from "./constants";
import {
    fetchAssets,
    fetchRenVMRewards,
    fetchSubgraphRewards,
} from "./fetchEpochRewards";
import { getPastLogs } from "./getPastLogs";

type LogNewEpoch = TypedEvent<
  [BigNumber] & {
    epochhash: BigNumber;
  }
>;

type LogDarknodeRegistered = TypedEvent<
  [string, string, BigNumber] & {
    _darknodeOperator: string;
    _darknodeID: string;
    amount: BigNumber;
  }
>;

type LogDarknodeDeregistered = TypedEvent<
  [string, string] & {
    _darknodeOperator: string;
    _darknodeID: string;
  }
>;

type LogDarknodeRefunded = TypedEvent<
  [string, string, BigNumber] & {
    _darknodeOperator: string;
    _darknodeID: string;
    _amount: BigNumber;
  }
>;

export interface RegistrationPeriod {
  darknodeID: string;
  registered: number;
  deregistered?: number;
  refunded?: number;
}

export interface Epoch {
  index: number;
  startBlockNumber: number;
  timestamp: number;
}

export const getDarknodeEvents = async (
  provider: Provider,
  operator: string
) => {
  const epochEvents = await getPastLogs<LogNewEpoch>(
    provider,
    DARKNODE_REGISTRY,
    DarknodeRegistryABI as AbiItem[],
    "LogNewEpoch",
    []
  );

  let currentEpochIndex = -15;

  // An epoch contains the rewards earned during that epoch and paid out at the
  // end of it.

  let epochs: Epoch[] = [];
  for (const epochEvent of epochEvents) {
    epochs.push({
      index: currentEpochIndex,
      startBlockNumber: epochEvent.blockNumber,
      timestamp: 0,
    });
    currentEpochIndex += 1;
  }

  epochs = await Promise.all(
    epochs.map(async (e) => ({
      ...e,
      timestamp: (await provider.getBlock(e.startBlockNumber)).timestamp,
    }))
  );

  epochs.push({
    index: currentEpochIndex,
    startBlockNumber: Infinity,
    timestamp: Infinity,
  });

  const operatorFilter =
    "0x000000000000000000000000" + operator.replace(/^0x/, "");

  const registrations: LogDarknodeRegistered[] =
    await getPastLogs<LogDarknodeRegistered>(
      provider,
      DARKNODE_REGISTRY,
      DarknodeRegistryABI as AbiItem[],
      "LogDarknodeRegistered",
      [operatorFilter]
    );

  const deregistrations = await getPastLogs<LogDarknodeDeregistered>(
    provider,
    DARKNODE_REGISTRY,
    DarknodeRegistryABI as AbiItem[],
    "LogDarknodeDeregistered",
    [operatorFilter]
  );

  const refunds = await getPastLogs<LogDarknodeRefunded>(
    provider,
    DARKNODE_REGISTRY,
    DarknodeRegistryABI as AbiItem[],
    "LogDarknodeRefunded",
    [operatorFilter]
  );

  const registrationPeriods: RegistrationPeriod[] = [];
  for (const registration of registrations) {
    const deregistration = deregistrations.filter(
      (e) =>
        e.blockNumber > registration.blockNumber &&
        e.args._darknodeID === registration.args._darknodeID
    )[0];
    const refund = refunds.filter(
      (e) =>
        e.blockNumber > registration.blockNumber &&
        e.args._darknodeID === registration.args._darknodeID
    )[0];
    registrationPeriods.push({
      darknodeID: registration.args._darknodeID,
      registered: epochs.filter(
        (e) => e.startBlockNumber > registration.blockNumber
      )[0].index,
      deregistered: deregistration
        ? epochs.filter(
            (e) => e.startBlockNumber > deregistration.blockNumber
          )[0].index
        : undefined,
      refunded: refund
        ? epochs.filter((e) => e.startBlockNumber > refund.blockNumber)[0].index
        : undefined,
    });
  }

  const currentEpoch = epochs[epochs.length - 1 - 1].index;

  const fetchSubgraphRewards_ = fetchSubgraphRewards(epochs);
  const fetchRenVMRewards_ = fetchRenVMRewards();

  const epochRewards = {
    ...(await fetchSubgraphRewards_),
    ...(await fetchRenVMRewards_),
  };

  const claims: { [epoch: number]: number } = {};

  // Add up the amount of darknodes the operator had during each epoch.
  for (const registrationPeriod of registrationPeriods) {
    for (
      // A darknode starts earning income when it goes from "pending registration"
      // to "registered".
      let epoch = registrationPeriod.registered;
      // A darknode stops earning income one epoch before it goes from
      // "registered" to "pending refund" (ie it loses its last income).
      epoch <
      Math.min((registrationPeriod.deregistered || Infinity) - 1, currentEpoch);
      epoch++
    ) {
      claims[epoch] = (claims[epoch] || 0) + 1;
    }
  }

  let csv = `Type,BuyAmount,BuyCurrency,SellAmount,SellCurrency,FeeAmount,FeeCurrency,Exchange,Group,Comment,Date\n`;

  const assets = await fetchAssets();

  for (const epoch in claims) {
    for (const asset in epochRewards[epoch]) {
      const reward = epochRewards[epoch][asset];
      const amount = reward * claims[epoch];
      const decimals = assets[asset.replace(/^ren/, "")];
      if (decimals === undefined) {
        throw new Error(`Unable to fetch asset decimals for ${asset}.`);
      }
      const amountShifted = amount / 10 ** decimals;
      const unixTimestamp = epochs.filter(
        (e) => e.index === parseInt(epoch, 10) + 1
      )[0].timestamp;
      const timestamp = moment(unixTimestamp * 1000).format("MM/DD/YY HH:mm");
      csv += `Income,${amountShifted},${asset},,,,,Darknode,,,${timestamp}\n`;
    }
  }

  return csv;
};
