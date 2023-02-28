import { getDefaultProvider } from 'ethers';
import { useEffect } from 'react';
import { createClient, useAccount, useConnect, useEnsName, configureChains, mainnet, WagmiConfig } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public'




export default function App() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const { data } = useEnsName({ address })
  useEffect(() => {
    connect()
  }, [])


  return (
      <div>
        <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <p>{data}</p>
      </div>
  );
}
