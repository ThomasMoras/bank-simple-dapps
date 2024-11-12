"use client";

import Balance from "@/components/bank/Balance";
import Deposits from "@/components/bank/Deposits";
import DepositsEvents from "@/components/bank/DepositsEvents";
import Withdraws from "@/components/bank/WIthdraws";
import WithdrawsEvents from "@/components/bank/WithdrawsEvents";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Welcome to the Simple Bank DApp</h1>
        {isConnected ? (
          <>
            <p className="text-sm pt-2">Connected with {address}</p>
          </>
        ) : (
          <p className="text-sm pt-2">Please connect your wallet to continue</p>
        )}
      </div>
      {isConnected ? (
        <>
          <div className="flex flex-row w-full mt-8">
            <div className="w-full flex-center">
              <div className="">
                <Balance />
              </div>
              <div className="pl-10">
                <Deposits />
              </div>
              <div className="pl-10">
                <Withdraws />
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full mt-8">
            <div className="w-1/2 text-center">
              <DepositsEvents />
            </div>
            <div className="w-1/2 text-center">
              <WithdrawsEvents />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
