import React, { useContext, useEffect, useState } from "react"
import * as nearAPI from "near-api-js"
import { ConnectionContext } from "./connection"

interface ContractContextProps {
  contract: any
  contractAccountId: string
}

export const ContractContext = React.createContext<ContractContextProps>({
  contract: undefined,
  contractAccountId: "",
})

const ContractProvider = (props: any) => {
  const [contract, setContract] = useState<nearAPI.Contract>()
  const { wallet } = useContext(ConnectionContext)
  const contractAccountId = "marketplace_test_5.xuguangxia.testnet"

  useEffect(() => {
    if (!wallet) return
    const contract = new nearAPI.Contract(wallet.account(), contractAccountId, {
      viewMethods: [],
      changeMethods: ["add_collection"],
      // sender: wallet.account(),
    })
    setContract(contract)
  }, [wallet])

  return (
    <ContractContext.Provider value={{ contract, contractAccountId }}>
      {props.children}
    </ContractContext.Provider>
  )
}

export default ContractProvider
