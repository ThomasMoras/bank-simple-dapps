import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { bankABI, bankAddress } from "@/app/constants";
import { formatEther } from "viem";

const Balance = () => {
  // const [balanceValue, setBalanceValue] = useState("");
  const { address } = useAccount();
  const { data: balance } = useReadContract({
    abi: bankABI,
    address: bankAddress,
    functionName: "getBalanceOfUser",
    args: [address],
  });

  useEffect(() => {
    const fetchBalance = async () => {
      console.log(balance?.toString());
      // setBalanceValue(balance?.toString() || "0");
    };
    fetchBalance();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-lg font-bold">Current balance</h1>
      <p className="text-lg">
        {balance ? formatEther(BigInt(balance?.toString() || "0")) : "0"}
      </p>
    </div>
  );
};

export default Balance;
