import React, { useCallback, useState } from "react";

import { JsonRpcProvider } from "@ethersproject/providers";

import { getOperatorExport } from "../lib/getOperatorExport";
import { PUBLIC_ETHEREUM_ENDPOINT } from "../lib/utils/constants";
import { OperatorExport } from "../lib/utils/types";
import { CSV } from "./CSV";
import { ReactComponent as Logo } from "./logo.svg";
import { Table } from "./Table";

function App() {
  const [operator, setOperator] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [operatorExport, setOperatorExport] = useState<OperatorExport>();

  const handleOperatorInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOperator(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      setProcessing(true);
      setOperatorExport(undefined);
      setError(undefined);

      try {
        const provider = new JsonRpcProvider(PUBLIC_ETHEREUM_ENDPOINT);
        const operatorExport = await getOperatorExport(provider, operator);
        setOperatorExport(operatorExport);
      } catch (error: any) {
        setError(error.message);
      }
      setProcessing(false);
    },
    [operator]
  );

  return (
    <div className="my-10">
      <div className="w-screen max-w-5xl ml-auto mr-auto p-1">
        <div className="container ml-auto mr-auto">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-6 bg-white space-y-6 sm:px-6">
              <div className="flex items-center justify-left">
                <Logo className="h-8 w-auto mr-2" />
                <h1>Darknode Rewards Export</h1>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Enter your operator address below to generate a list of past
                darknode rewards. Rewards for multiple darknodes are combined
                into a single event per asset. Note - up until Epoch 15,
                darknodes required ETH to claim rewards - this tool currently
                assumes all claims were made. The downloadable CSV format is
                compatible with{" "}
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://tokentax.co"
                  className="text-blue-900"
                >
                  TokenTax.co
                </a>
                .
              </p>
            </div>
            <div className="p-6 bg-gray-50 text-right">
              <form
                onSubmit={handleSubmit}
                className="flex items-center justify-center"
              >
                <input
                  id="about"
                  name="about"
                  type="text"
                  disabled={processing}
                  placeholder="Operator Address"
                  value={operator}
                  onChange={handleOperatorInput}
                  className="p-2 shadow-sm focus:ring-blue-900 focus:border-blue-900 block w-full sm:text-sm border border-gray-300 rounded-l-md disabled:opacity-80"
                />
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-r-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {processing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>{" "}
                      Calculating
                    </>
                  ) : (
                    <>Calculate</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {operatorExport ? (
        <div className="w-screen max-w-5xl mt-2 ml-auto mr-auto p-1">
          <div className="p-5 shadow sm:rounded-md sm:overflow-hidden container ml-auto mr-auto bg-gray-50 mb-4">
            <div className="mb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Summary
            </div>
            <div className="text-sm text-gray-900">
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://etherscan.io/address/${operatorExport.operator}`}
                className="text-blue-900"
              >
                {operatorExport.operator.slice(0, 8)}...
                {operatorExport.operator.slice(-6)}
              </a>{" "}
              earned rewards from {operatorExport.activeDarknodes} darknode
              {operatorExport.activeDarknodes !== 1 ? "s" : ""}{" "}
              {operatorExport.activeDarknodes !==
              operatorExport.totalDarknodes ? (
                <>(out of {operatorExport.totalDarknodes} darknodes)</>
              ) : null}{" "}
              over {operatorExport.epochCount} epochs. Generated on{" "}
              {operatorExport.date.format("LLL")}.
            </div>
            <br />
            <div className="text-sm text-gray-900">
              <CSV
                operator={operatorExport.operator}
                taxableEvents={operatorExport.events}
              />
            </div>
          </div>
          <Table taxableEvents={operatorExport.events} />
        </div>
      ) : null}

      {error ? (
        <div className="w-screen max-w-5xl mt-4 ml-auto mr-auto p-1">
          <div className="p-5 shadow sm:rounded-md sm:overflow-hidden container ml-auto mr-auto bg-gray-50">
            <p className="text-red">Error: {error}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
