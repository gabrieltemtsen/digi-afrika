import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import celoGroups from "@celo/rainbowkit-celo/lists";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, celoAlfajores } from "wagmi/chains";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    goerli,
    Alfajores,
    Celo,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()],
);

const projectId ="fd65001eca3d65f4d845b7e9a7cba718"

const connectors = celoGroups({
  chains,
  projectId,
  appName:
      (typeof document === "object" && document.title) || "Digi-afrika",
});

const appInfo = {
  appName: "Digi-afrika",
};


// const { connectors } = getDefaultWallets({
//   appName: "RainbowKit App",
//   projectId: "fd65001eca3d65f4d845b7e9a7cba718",
//   chains,
// });

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider  appInfo={appInfo}
                coolMode={true}
                chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
