import Axios from "axios";
import BigNumber from "bignumber.js";

import { Epoch } from "./types";

export const fetchRenVMRewards = async () => {
  const response = await Axios.post("https://lightnode-mainnet.herokuapp.com", {
    id: 1,
    jsonrpc: "2.0",
    method: "ren_queryBlockState",
    params: {},
  });

  const data = response.data;

  const epochs: { [epoch: number]: { [asset: string]: BigNumber } } = {};

  for (const asset of Object.keys(data.result.state.v)) {
    const fees = data.result.state.v[asset].fees?.epochs;
    if (!fees) {
      continue;
    }

    for (const epoch of fees) {
      const index = parseInt(epoch.epoch, 10) + 14;
      epochs[index] = epochs[index] || {};
      epochs[index][asset] = new BigNumber(epoch.amount)
        .dividedBy(epoch.numNodes)
        .integerValue();
    }
  }

  delete epochs[14];
  delete epochs[15];

  return epochs;
};

export const fetchSubgraphRewards = async (epochDetails: Epoch[]) => {
  const response = await Axios.post(
    "https://api.thegraph.com/subgraphs/name/renproject/renvm",
    {
      query: `
{
    epoches(first: 100, orderBy: blockNumber, orderDirection:asc) {
        blockNumber
        
        rewardShares {
        symbol
        amount
        amountInUsd
        }
    }
}
`,
    }
  );

  const epochs: { [epoch: number]: { [asset: string]: BigNumber } } = {};

  for (const epoch of response.data.data.epoches) {
    // The Subgraph epoch contains the reward shares for the previous epoch.
    const epochIndex =
      epochDetails.filter(
        (e) => e.startBlockNumber.toString() === epoch.blockNumber
      )[0].index - 1;
    for (const reward of epoch.rewardShares) {
      if (reward.symbol === "ETH" || reward.symbol === "SAI") {
        continue;
      }
      epochs[epochIndex] = epochs[epochIndex] || {};
      epochs[epochIndex][reward.symbol] = new BigNumber(reward.amount);
    }
  }

  return epochs;
};

export const fetchAssets = async () => {
  const response = await Axios.post(
    "https://api.thegraph.com/subgraphs/name/renproject/renvm",
    {
      query: `
{
    assets {
        symbol
        decimals
    }
}
  `,
    }
  );

  const assets: { [symbol: string]: number } = {};

  for (const asset of response.data.data.assets) {
    assets[asset.symbol.replace(/^ren/, "")] = asset.decimals;
  }

  return assets;
};
