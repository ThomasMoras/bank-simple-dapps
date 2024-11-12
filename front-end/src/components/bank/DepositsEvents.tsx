import { config } from "@/app/config";
import { bankABI, bankAddress } from "@/app/constants";
import { publicClient } from "@/utils/client";
import { dataTagSymbol } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { parseAbiItem } from "viem";
import { useFeeData, useWatchContractEvent } from "wagmi";

const DepositsEvents = () => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const etherDepositedLog = await publicClient.getLogs({
      address: bankAddress,
      event: parseAbiItem(
        "event EtherDeposited(address indexed depositor, uint256 amount)"
      ),
      fromBlock: 0n,
      toBlock: "latest",
    });
    console.log(etherDepositedLog);
    setEvents(
      etherDepositedLog.map((log) => ({
        depositor: log.args.depositor,
        amount: log.args.amount?.toString(),
      }))
    );
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Deposits Events</h1>
      <div className="flex flex-col mt-5">
        {events.map((event) => (
          <div key={event.depositor}>
            <p>Depositor: {event.depositor}</p>
            <p>Amount: {event.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepositsEvents;
