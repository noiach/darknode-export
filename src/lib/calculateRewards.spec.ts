import { JsonRpcProvider } from "@ethersproject/providers";

import { getDarknodeEvents } from "./calculateRewards";
import { PUBLIC_ETHEREUM_ENDPOINT } from "./constants";

jest.setTimeout(100 * 1000);

describe("calculateRewards", () => {
  it("fetches events", async () => {
    const provider = new JsonRpcProvider(PUBLIC_ETHEREUM_ENDPOINT);

    await getDarknodeEvents(provider, "");
  });
});
