import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiProvider } from "wagmi";
import { mainnet } from "viem/chains";
import { http } from "viem";
import { Pimlico } from "./Pimlico";

import { useEffect, useState } from "react";

const App = () => {
  const [smartAccount, setSmartAccount] = useState(null);

  const config = createConfig({
    chains: [mainnet],
    multiInjectedProviderDiscovery: false,
    transports: {
      [mainnet.id]: http(),
    },
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (smartAccount) console.log("Smart Account: ", smartAccount);
  }, [smartAccount]);

  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.REACT_APP_DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <DynamicWidget />
            <Pimlico
              smartAccount={smartAccount}
              setSmartAccount={setSmartAccount}
            />
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};

export default App;
