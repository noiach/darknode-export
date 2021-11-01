import { Interface, keccak256, Result } from "ethers/lib/utils";

import { Provider } from "@ethersproject/providers";

import { AbiItem } from "./abiItem";
import { TypedEvent } from "./ABIs/common";

const findABIMethod = (abi: AbiItem[], name: string) => {
  const first = abi.filter((item) => item.name === name)[0];
  if (!first) {
    throw new Error(`No ABI entry found for "${name}".`);
  }
  return first;
};

const getEventTopic = (abiItem: AbiItem) => {
  const parameters =
    abiItem.inputs && abiItem.inputs.length > 0
      ? abiItem.inputs.map((input) => input.type).join(",")
      : "";
  const eventSignature = `${abiItem.name}(${parameters})`;
  return keccak256(Buffer.from(eventSignature));
};

export const getPastLogs = async <T extends TypedEvent<Result>>(
  provider: Provider,
  contractAddress: string,
  contractAbi: AbiItem[],
  logName: string,
  filter?: any[]
): Promise<T[]> => {
  const eventABI = findABIMethod(contractAbi, logName);

  const logs = await provider.getLogs({
    address: contractAddress,
    fromBlock: 1,
    toBlock: "latest",
    topics: [getEventTopic(eventABI), ...(filter || [])] as string[],
  });

  const logTopic = getEventTopic(eventABI);

  const logDecoder = new Interface([eventABI]);

  return logs
    .filter((event) => event.topics[0] === logTopic)
    .map(
      (event) =>
        ({
          ...logDecoder.parseLog(event),
          transactionHash: event.transactionHash,
          blockNumber: event.blockNumber,
        } as unknown as T)
    );
};
