import * as nearAPI from "near-api-js"
import {
  ConnectConfig,
  providers,
  WalletConnection as WalletConnectionProps,
} from "near-api-js"
import { Provider } from "near-api-js/lib/providers"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import * as buffer from "buffer"
  ; (window as any).Buffer = buffer.Buffer

const { connect, keyStores, WalletConnection } = nearAPI

export const configs: ConnectConfig[] = [
  {
    networkId: process.env.REACT_APP_NETWORK_ID,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: process.env.REACT_APP_NODE_URL,
    walletUrl: `https://wallet.${process.env.REACT_APP_NETWORK_ID}.near.org`,
    helperUrl: `https://helper.${process.env.REACT_APP_NETWORK_ID}.near.org`,
    // explorerUrl: "https://explorer.mainnet.near.org",
    headers: {},
  },
]

interface ConnectionContextProps {
  near: nearAPI.Near | undefined
  wallet: WalletConnectionProps | undefined
  network: string
  provider: Provider | undefined
  setNetwork: Function
  signIn: Function
  signOut: Function
}

export const ConnectionContext = React.createContext<ConnectionContextProps>({
  near: undefined,
  wallet: undefined,
  network: process.env.REACT_APP_NETWORK_ID,
  provider: undefined,
  setNetwork: () => { },
  signIn: () => { },
  signOut: () => { },
})

// connect to NEAR
const ConnectionProvider = (props: any) => {
  const [network, setNetwork] = useState(process.env.REACT_APP_NETWORK_ID)
  const [near, setNear] = useState<nearAPI.Near>()
  const [wallet, setWallet] = useState<WalletConnectionProps>()
  const [forseRender, setForseRender] = useState<boolean>(false)
  const config =
    configs.find((config) => config.networkId === network) || configs[0]

  const provider = useMemo(
    () => new providers.JsonRpcProvider(config.nodeUrl),
    [config.nodeUrl]
  )

  const connectToNear = useCallback(async () => {
    try {
      const near = await connect(config)
      const wallet = new WalletConnection(near, null)
      setNear(near)
      setWallet(wallet)
    } catch (error) {
      console.log(error)
    }
  }, [config])

  useEffect(() => {
    setForseRender(!forseRender)
    connectToNear()
  }, [connectToNear])

  useEffect(() => {
    connectToNear()
  }, [])

  const signIn = () => {
    wallet.requestSignIn("galacticwaymp.near")
    location.reload()
  }

  const signOut = () => {
    if (!wallet) return
    wallet.signOut()
    location.replace("/")
  }

  return (
    <ConnectionContext.Provider
      value={{ near, wallet, provider, network, setNetwork, signIn, signOut }}
    >
      {props.children}
    </ConnectionContext.Provider>
  )
}

export default ConnectionProvider
