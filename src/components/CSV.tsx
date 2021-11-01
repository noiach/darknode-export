import moment from "moment";
import React, { useMemo } from "react";

import { TaxableEvent } from "../lib/utils/types";

export const CSV: React.FC<{
  operator: string;
  taxableEvents: TaxableEvent[];
}> = ({ operator, taxableEvents }) => {
  const csv = useMemo(() => {
    let csv = `Type,BuyAmount,BuyCurrency,SellAmount,SellCurrency,FeeAmount,FeeCurrency,Exchange,Group,Comment,Date\n`;
    for (const event of taxableEvents) {
      csv += `Income,${event.amount},${
        event.asset
      },,,,,Darknode,,,${event.timestamp.format("MM/DD/YY HH:mm")}\n`;
    }
    return csv;
  }, [taxableEvents]);

  const filename = useMemo(
    () =>
      `operator-${operator.slice(0, 8)}-export-${moment().format(
        "YYYY_MM_DD"
      )}.csv`,
    [operator]
  );

  return (
    <a
      href={`data:text/csv;charset=utf-8,${escape(csv)}`}
      download={filename}
      className="text-blue-900"
    >
      Download CSV
    </a>
  );
};
