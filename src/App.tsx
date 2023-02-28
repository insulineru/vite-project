import * as React from 'react';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import type { ExternalProvider } from '@ethersproject/providers';

export default function App() {
  const [provider, setProvider] = React.useState<Web3Provider>();

  React.useEffect(() => {
    // @ts-ignore
    const ethereum: any = window.ethereum;

    const findedProvider = () => {
      if (ethereum.providers?.length) {
        const provider = ethereum?.providers.find(
          (prov: any) => prov?.isMetaMask
        );
        if (!provider) {
          throw new Error('[WalletProvider] No provider found');
        }

        return provider;
      }

      return ethereum;
    };

    const walletProvider = findedProvider();

    const provider = new Web3Provider(
      walletProvider as ExternalProvider,
      'any'
    );

    setProvider(provider);

    provider.send('eth_requestAccounts', []);
  }, []);

  React.useEffect(() => {
    const fetch = async () => {
      if (!provider) return;

      const address = await provider.getSigner().getAddress();
      // const ens = await provider.lookupAddress(address);
      const providerrr = new JsonRpcProvider('https://rpc.ankr.com/eth')
      const ens = await providerrr.lookupAddress(address);

      console.log(address, ens);
    };
    if (provider) {
      console.log(provider);
      fetch();
    }
  }, [provider]);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
