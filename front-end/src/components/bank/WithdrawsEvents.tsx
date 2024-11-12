import { config } from "@/app/config";
import { bankABI, bankAddress } from "@/app/constants";
import { publicClient } from "@/utils/client";
import React, { useEffect, useState } from "react";
import { parseAbiItem } from "viem";

const DepositsEvents = () => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const etherWithdrawnLog = await publicClient.getLogs({
      address: bankAddress,
      event: parseAbiItem(
        "event EtherWithdrawn(address indexed withdrawer, uint256 amount)"
      ),
      fromBlock: 0n,
      toBlock: "latest",
    });
    console.log(etherWithdrawnLog);
    setEvents(
      etherWithdrawnLog.map((log) => ({
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
      <h1 className="text-2xl font-bold">Withdraws Events</h1>
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
