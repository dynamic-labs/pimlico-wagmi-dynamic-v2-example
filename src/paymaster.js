import { http } from "viem";
import { sepolia } from "viem/chains";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";

export const pimlicoPaymasterClient = createPimlicoPaymasterClient({
  chain: sepolia,
  transport: http(
    `https://api.pimlico.io/v2/sepolia/rpc?apikey=${process.env.REACT_APP_PIMLICO_API_KEY}`
  ),
  entryPoint: ENTRYPOINT_ADDRESS_V07,
});
