import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import celoGroups from "@celo/rainbowkit-celo/lists";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, celoAlfajores, avalancheFuji, auroraTestnet, arbitrumGoerli } from "wagmi/chains";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import { publicProvider } from "wagmi/providers/public";
import { useEffect, useState } from "react";
import { getNetwork, watchNetwork } from '@wagmi/core'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    goerli,
    arbitrumGoerli,
    avalancheFuji,
    auroraTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()],
);


const projectId = process.env.PROJECT_ID

// const connectors = celoGroups({
//   chains,
//   projectId,
//   appName:
//       (typeof document === "object" && document.title) || "Digi-afrika",
// });

const appInfo = {
  appName: "Digi-afrika",
};




const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "fd65001eca3d65f4d845b7e9a7cba718",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

 
       
function MyApp({ Component, pageProps }: AppProps) {
  const { chain, chains } = getNetwork()

  const [currentChain, setCurrntChain] = useState<any>()
  const [currentTheme, setCurrentTheme] = useState('synthwave')


 
 

  const unwatch = watchNetwork((network) => {
    
      if(network.chain?.id == 43113) {
        setCurrentTheme('emerald')
      }
      else if (network.chain?.id == 421613) {
        setCurrentTheme('night')

      }
      else if (network.chain?.id == 5) {
        setCurrentTheme('synthwave')
      }
      else if (network.chain?.id == 1313161555) {
        setCurrentTheme('black')

      }
  })





  // useEffect(() => {
   
  //   console.log(currentChain)
  //   if(currentChain == 43113) {
  //     setCurrentTheme('lemonade')
  //   }
    
  // }, [])
  return (
    <>
     <div data-theme={currentTheme}> 
      <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider  appInfo={appInfo}
                coolMode={true}
                chains={chains}>
        <Component {...pageProps}  />
      </RainbowKitProvider>
    </WagmiConfig>

    </div>
    </>
   
    
  );
}

export default MyApp;
