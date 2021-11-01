import moment from "moment";

import { Provider } from "@ethersproject/providers";

import DarknodeRegistryABI from "./ABIs/DarknodeRegistry.json";
import { DARKNODE_REGISTRY } from "./utils/constants";
import {
    fetchAssets,
    fetchRenVMRewards,
    fetchSubgraphRewards,
} from "./utils/fetchEpochRewards";
import { getPastLogs } from "./utils/getPastLogs";
import {
    AbiItem,
    Epoch,
    LogDarknodeDeregistered,
    LogDarknodeRefunded,
    LogDarknodeRegistered,
    LogNewEpoch,
    OperatorExport,
    RegistrationPeriod,
    TaxableEvent,
} from "./utils/types";
import { getBlockTimestamp } from "./utils/utils";

/**
 * Generate a list of taxable events for a darknode operator.
 *
 * @param provider Ethers.js provider instance.
 * @param operator The Ethereum address of the darknode operator.
 * @returns
 */
export const getOperatorExport = async (
  provider: Provider,
  operator: string
): Promise<OperatorExport> => {
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
      timestamp: await getBlockTimestamp(provider, e.startBlockNumber),
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
      // A darknode starts earning rewards when it goes from "pending registration"
      // to "registered".
      let epoch = registrationPeriod.registered;
      // A darknode stops earning rewards one epoch before it goes from
      // "registered" to "pending refund" (ie it loses its last income).
      epoch <
      Math.min((registrationPeriod.deregistered || Infinity) - 1, currentEpoch);
      epoch++
    ) {
      claims[epoch] = (claims[epoch] || 0) + 1;
    }
  }

  const assets = await fetchAssets();

  const taxableEvents: TaxableEvent[] = [];

  for (const epoch in claims) {
    for (const asset in epochRewards[epoch]) {
      const reward = epochRewards[epoch][asset];
      const amount = reward.times(claims[epoch]);
      const decimals = assets[asset.replace(/^ren/, "")];
      if (decimals === undefined) {
        throw new Error(`Unable to fetch asset decimals for ${asset}.`);
      }
      const amountShifted = amount.shiftedBy(-decimals);
      const unixTimestamp = epochs.filter(
        (e) => e.index === parseInt(epoch, 10) + 1
      )[0].timestamp;
      const timestamp = moment(unixTimestamp * 1000);
      if (amountShifted.isGreaterThan(0)) {
        taxableEvents.push({
          amount: amountShifted.toFixed(),
          asset,
          timestamp,
          epoch: parseInt(epoch),
          activeDarknodes: claims[epoch],
        });
      }
    }
  }

  return {
    date: moment(),
    operator,
    epochCount: new Set(taxableEvents.map((x) => x.epoch)).size,
    darknodeCount: new Set(registrationPeriods.map((x) => x.darknodeID)).size,
    events: taxableEvents,
  };
};
