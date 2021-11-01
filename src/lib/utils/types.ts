// Events
import BigNumber from "bignumber.js";
import { Moment } from "moment";

import { TypedEvent } from "../ABIs/common";

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

export interface TaxableEvent {
  amount: string;
  asset: string;
  timestamp: Moment;
  epoch: number;
  activeDarknodes: number;
}

export interface OperatorExport {
  date: Moment;
  operator: string;
  epochCount: number;
  darknodeCount: number;
  events: TaxableEvent[];
}

export interface AbiItem {
  inputs?: Array<{
    name: string;
    type: string;
  }>;
  name?: string;
  type: string;
}

// Events

export type LogNewEpoch = TypedEvent<
  [BigNumber] & {
    epochhash: BigNumber;
  }
>;

export type LogDarknodeRegistered = TypedEvent<
  [string, string, BigNumber] & {
    _darknodeOperator: string;
    _darknodeID: string;
    amount: BigNumber;
  }
>;

export type LogDarknodeDeregistered = TypedEvent<
  [string, string] & {
    _darknodeOperator: string;
    _darknodeID: string;
  }
>;

export type LogDarknodeRefunded = TypedEvent<
  [string, string, BigNumber] & {
    _darknodeOperator: string;
    _darknodeID: string;
    _amount: BigNumber;
  }
>;
