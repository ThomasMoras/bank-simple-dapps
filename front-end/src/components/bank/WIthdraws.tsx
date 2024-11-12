import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useWriteContract } from "wagmi";
import { bankABI, bankAddress } from "@/app/constants";
import { parseEther } from "viem";

const Withdraws = () => {
  const [amount, setAmount] = useState(0);

  const { data, error, isPending, writeContract } = useWriteContract({
    mutation: {
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log("error", error);
      },
    },
  });

  const handleWithdraw = async () => {
    writeContract({
      address: bankAddress,
      abi: bankABI,
      functionName: "withdraw",
      args: [parseEther(amount.toString())],
    });
  };

  return (
    <div>
      <h1 className="text-lg text-center font-bold">Make a withdraw</h1>
      <div className="flex flex-row gap-2 max-w-xs pt-2">
        <Input
          type="number"
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
          placeholder="Amount in ETH"
          className="w-2/3"
        />
        <Button onClick={handleWithdraw} className="w-1/3">
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default Withdraws;
