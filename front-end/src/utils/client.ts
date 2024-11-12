import { createPublicClient, http } from "viem";
import { holesky, hardhat } from "viem/chains";

const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC || "";

export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(RPC),
});
