import { http, createConfig } from "wagmi";
import { hardhat, holesky, mainnet } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, holesky],
  transports: {
    [mainnet.id]: http(),
    [hardhat.id]: http(),
    [holesky.id]: http(),
  },
});
