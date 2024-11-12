import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { bankABI, bankAddress } from "@/app/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { parseEther } from "viem";

const Deposits = () => {
  const [amount, setAmount] = useState(0);

  const {
    data: hash,
    error,
    isPending: setIsPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log("error", error);
      },
    },
  });

  const handleDeposit = async () => {
    console.log(bankABI);
    console.log("amount", parseEther(amount.toString()));
    try {
      writeContract({
        address: bankAddress,
        abi: bankABI,
        functionName: "sendEthers",
        value: parseEther(amount.toString()),
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <h1 className="text-lg text-center font-bold">Make a deposit</h1>
      <div className="flex flex-row gap-2 max-w-xs pt-2">
        <Input
          type="number"
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
          placeholder="Amount in ETH"
          className="w-2/3"
        />
        <Button onClick={handleDeposit} className="w-1/3">
          Deposit
        </Button>
      </div>
    </>
  );
};

export default Deposits;
