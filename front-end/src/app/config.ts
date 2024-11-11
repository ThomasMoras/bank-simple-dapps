import { http, createConfig } from "wagmi";
import { holesky, mainnet } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, holesky],
  transports: {
    [mainnet.id]: http(),
    [holesky.id]: http(),
  },
});
