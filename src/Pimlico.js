import {
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
} from "permissionless";
import { signerToSimpleSmartAccount } from "permissionless/accounts";
import { usePublicClient, useWalletClient } from "wagmi";
import { http } from "viem";
import { sepolia } from "viem/chains";
import { useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { pimlicoPaymasterClient } from "./paymaster";

export const Pimlico = ({ smartAccount, setSmartAccount }) => {
  const { primaryWallet } = useDynamicContext();

  const publicClient = usePublicClient();

  const { data: walletClient } = useWalletClient();

  const init = async () => {
    console.log("Initializing Pimlico");

    const customSigner = walletClientToSmartAccountSigner(walletClient);

    const simpleSmartAccountClient = await signerToSimpleSmartAccount(
      publicClient,
      {
        entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
        signer: customSigner,
        factoryAddress: "0x9406Cc6185a346906296840746125a0E44976454",
      }
    );

    const smartAccountClient = createSmartAccountClient({
      account: simpleSmartAccountClient,
      chain: sepolia, // or whatever chain you are using
      bundlerTransport: http(
        `https://api.pimlico.io/v1/sepolia/rpc?apikey=${process}`
      ),
      sponsorUserOperation: pimlicoPaymasterClient.sponsorUserOperation, // if using a paymaster
    });

    setSmartAccount(smartAccountClient);
  };

  useEffect(() => {
    if (primaryWallet?.authenticated && !smartAccount) init();
  }, [primaryWallet, smartAccount]);

  return <></>;
};
