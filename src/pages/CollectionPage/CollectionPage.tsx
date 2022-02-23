import { CodeResult } from "near-api-js/lib/providers/provider"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ActivityIcon from "../../assets/icons/ActivityIcon"
import ItemsIcon from "../../assets/icons/ItemsIcon"
import ActivityTable from "../../components/ActivityTable/ActivityTable"
import BodyText from "../../components/BodyText/BodyText"
import { ConnectionContext } from "../../contexts/connection"
import { ContractContext } from "../../contexts/contract"
import "./CollectionPage.scss"
import CollectionInfoSection from "./components/CollectionInfoSection/CollectionInfoSection"
import FilterSection from "./components/FilterSection/FilterSection"
import GallerySection from "./components/GallerySection/GallerySection"
import * as nearAPI from "near-api-js"
import { convertTokenResultToItemStruct } from "../../helpers/utils"
import { TItem } from "../ItemPage/ItemPage"
import { getAllSalesInCollection } from "../../helpers/collections"

type TCollectionLinks = {
  discord?: string
  twitter?: string
  website?: string
  telegram?: string
  instagram?: string
  medium?: string
}

export type TCollection = {
  collectionId: string
  tokenType: string
  name: string
  isVerified: boolean
  bannerImageUrl: string
  links: TCollectionLinks
  profileImageUrl: string
  creator: string
  royalty: number
  description: string
}

export type TCollectionContractDetails = {
  numberOfItems?: number
  owners?: number
  floorPrice?: number
  volTraded?: number
}

const CollectionPage = () => {
  const { collectionId, tokenType } = useParams()

  const { provider, wallet } = useContext(ConnectionContext)
  const { contractAccountId, contract } = useContext(ContractContext)

  const [collectionMarketplaceDetails, setCollectionMarketplaceDetails] =
    useState<TCollection | null>(null)
  const [collectionContractDetails, setCollectionContractDetails] =
    useState<TCollectionContractDetails | null>(null)
  const [items, setItems] = useState<TItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [collapseFilterContainer, setCollapseFilterContainer] = useState(false)
  const [mode, setMode] = useState<"items" | "activities">("items")

  // fetch collection details using collectionId and tokenType
  const fetchCollectionMarketDetails = useCallback(async () => {
    const rawResult: any = await provider.query({
      request_type: "call_function",
      account_id: contractAccountId,
      method_name: "get_collection",
      args_base64: btoa(
        `{"nft_contract_id": "${collectionId}", "token_type": "${tokenType}"}`
      ),
      finality: "optimistic",
    })
    const result = JSON.parse(Buffer.from(rawResult.result).toString())
    const collectionDetails: TCollection = {
      collectionId: result.nft_contract_id,
      tokenType: result.token_type,
      name: result.name,
      isVerified: result.isVerified,
      bannerImageUrl: result.bannerImageUrl,
      profileImageUrl: result.profileImageUrl,
      description: result.description,
      royalty: result.royalty,
      links: result.links,
      creator: "",
    }
    return collectionDetails
  }, [])

  const fetchCollectionContractDetails = useCallback(async () => {
    const details: TCollectionContractDetails = {
      numberOfItems: 1212,
      owners: 10,
      floorPrice: 2,
      volTraded: 2391,
    }
    return details
  }, [])

  // fetch items on sale in this collection
  const fetchItems = useCallback(async () => {
    try {
      //get all listed sales in a collection from marketplace contract
      const sales = await getAllSalesInCollection(
        provider,
        contractAccountId,
        collectionId
      )

      // //get the token object for all the sales using nft_tokens_batch
      // const salesTokensResults: any = await provider.query({
      //   request_type: "call_function",
      //   account_id: collectionId,
      //   method_name: "nft_tokens_batch",
      //   args_base64: btoa(
      //     `{"token_ids": ${sales
      //       .filter(({ nft_contract_id }) => nft_contract_id === collectionId)
      //       .map(({ token_id }) => token_id)}}`
      //   ),
      //   finality: "optimistic",
      // })
      // const saleTokens = JSON.parse(
      //   Buffer.from(salesTokensResults.result).toString()
      // )

      const saleTokens = []

      //get token obj for the tokens not gotten by batch fetch (if any)
      for (let i = 0; i < sales.length; i++) {
        const { token_id } = sales[i]
        let token = saleTokens.find(({ token_id: t }) => t === token_id)
        if (!token) {
          const tokenRawResult: any = await provider.query({
            request_type: "call_function",
            account_id: collectionId,
            method_name: "nft_token",
            args_base64: btoa(`{"token_id": "${token_id}"}`),
            finality: "optimistic",
          })
          token = JSON.parse(Buffer.from(tokenRawResult.result).toString())
        }
        sales[i] = Object.assign(sales[i], token)
      }

      const items: TItem[] = sales?.map((result) =>
        convertTokenResultToItemStruct(
          result,
          collectionMarketplaceDetails?.name,
          collectionId
        )
      )
      console.log(items)
      return items
    } catch (error) {
      console.log(error)
    }
  }, [])

  const fetchAll = useCallback(async () => {
    setIsLoading(true)
    try {
      const values = await Promise.all([
        await fetchCollectionMarketDetails(),
        await fetchCollectionContractDetails(),
        await fetchItems(),
      ])

      setCollectionMarketplaceDetails(values[0])
      setCollectionContractDetails(values[1])
      setItems(values[2])
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const switchToActivities = () => {
    setMode("activities")
    setCollapseFilterContainer(true)
  }

  const switchToItems = () => {
    setMode("items")
    setCollapseFilterContainer(false)
  }

  return (
    <div className="collection-page">
      <CollectionInfoSection
        collectionMarketplaceDetails={collectionMarketplaceDetails}
        collectionContractDetails={collectionContractDetails}
        isLoading={isLoading}
      />
      <div className="mode-switch">
        <div
          onClick={switchToItems}
          className={`mode-set ${mode === "items" ? "selected" : ""}`}
        >
          <ItemsIcon isSelected={mode === "items"} />
          <BodyText light>Items</BodyText>
        </div>
        <div
          onClick={switchToActivities}
          className={`mode-set ${mode === "activities" ? "selected" : ""}`}
        >
          <ActivityIcon isSelected={mode === "activities"} />
          <BodyText light>Activities</BodyText>
        </div>
      </div>
      <div className="filter-and-gallery-container">
        <div className="filter-container">
          <FilterSection
            collapseFilterContainer={collapseFilterContainer}
            setCollapseFilterContainer={setCollapseFilterContainer}
          />
        </div>
        {mode === "items" ? (
          <div className="gallery-section-container">
            <GallerySection
              isLoading={isLoading}
              items={items || null}
              collectionId={collectionId}
              setCollapseFilterContainer={setCollapseFilterContainer}
            />
          </div>
        ) : (
          <ActivityTable
            activities={[
              {
                itemName: "Stressed Coders #2352",
                itemImageUrl:
                  "https://cdn.magiceden.io/rs:fill:40:40:0:0/plain/https://arweave.net/L1DNqHMvx9ngzWSAp5DSibVUo6YWDTdLXAjAAzTdvvs/1663.png",
                trxType: "Listing",
                trxId: "sadfasdfasuf",
                time: 1644244154000,
                amount: 15.8,
                mintAddress: "sadfasdfasuf",
              },
            ]}
          />
        )}
      </div>
    </div>
  )
}

export default CollectionPage
