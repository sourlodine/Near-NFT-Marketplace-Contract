import React, { useCallback, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import BodyText from "../../../components/BodyText/BodyText"
import Button from "../../../components/Button/Button"
import InputBox from "../../../components/InputBox/InputBox"
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle"
import { ConnectionContext } from "../../../contexts/connection"
import { ContractContext } from "../../../contexts/contract"
import { TCollection } from "../../CollectionPage/CollectionPage"

import "./AddCollectionPage.scss"

const AddCollectionPage = () => {
  const locationState: any = useLocation().state
  const mode = locationState?.mode || "new"
  const collectionId = locationState?.collectionId || null
  const collectionTokenType = locationState?.collectionTokenType || null
  const { contract, contractAccountId } = useContext(ContractContext)
  const { wallet, provider } = useContext(ConnectionContext)
  const [input, setInput] = useState({
    name: "",
    bannerImageUrl: "",
    isVerified: false,
    profileImageUrl: "",
    description: "",
    royalty: "",
    discord: "",
    twitter: "",
    website: "",
    telegram: "",
    instagram: "",
    medium: "",
  })
  const [isFetchingCollectionDetails, setIsFetchingCollectionDetails] =
    useState(false)

  const onInputChange = (event: any) => {
    const { value, name } = event.target
    if (!value) return
    setInput((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const addCollection = async () => {
    try {
      if (!contract || !wallet) return
      await contract.add_collection({
        nft_contract_id: "newcontract.resdde.testnet",
        token_type: "tokenType",
        name: input.name,
        isVerified: false,
        bannerImageUrl: input.bannerImageUrl,
        profileImageUrl: input.profileImageUrl,
        creator: "resdde.testnet",
        description: input.description,
        royalty: input.royalty,
        discord: input.discord,
        twitter: input.twitter,
        website: input.website,
        telegram: input.telegram,
        instagram: input.instagram,
        medium: input.medium,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const editCollection = async () => {
    try {
      if (!contract || !wallet) return
      await contract.edit_collection({
        nft_contract_id: "newcontract.resdde.testnet",
        token_type: "tokenType",
        name: input.name,
        isVerified: false,
        bannerImageUrl: input.bannerImageUrl,
        profileImageUrl: input.profileImageUrl,
        creator: "resdde.testnet",
        description: input.description,
        royalty: input.royalty,
        discord: input.discord,
        twitter: input.twitter,
        website: input.website,
        telegram: input.telegram,
        instagram: input.instagram,
        medium: input.medium,
      })
    } catch (error) {
      console.log()
    }
  }

  const onSubmit = () => {
    if (mode !== "edit") {
      addCollection()
    } else {
      editCollection()
    }
  }

  const fetchCollectionDetails = useCallback(async () => {
    setIsFetchingCollectionDetails(true)
    try {
      // FETCHES THE COLLECTION DETAILS OF THE COLLECTION TO BE EDITED.
      const rawResult: any = await provider.query({
        request_type: "call_function",
        account_id: contractAccountId,
        method_name: "get_collection",
        args_base64: btoa(
          `{nft_contract_id: ${collectionId}, token_type: ${collectionTokenType}}`
        ),
        finality: "optimistic",
      })
      const result = JSON.parse(Buffer.from(rawResult.result).toString())

      const placeholderResult = {
        nft_contract_id: "asdlkf",
        token_type: "asdlkf",
        name: "asdlkf",
        isVerified: false,
        bannerImageUrl: "asdlkf",
        profileImageUrl: "asdlkf",
        description: "asdlkf",
        royalty: "asdlkf",
        links: {
          discord: "discord",
          twitter: "twitter",
          website: "website",
          telegram: "telegra",
          instagram: "instagr",
          medium: "medium",
        },
      }
      const {
        nft_contract_id,
        token_type,
        name,
        isVerified,
        bannerImageUrl,
        profileImageUrl,
        description,
        royalty,
        links,
      } = placeholderResult

      setInput({
        name,
        bannerImageUrl,
        profileImageUrl,
        description,
        isVerified,
        royalty,
        discord: links.discord,
        twitter: links.twitter,
        website: links.website,
        telegram: links.telegram,
        instagram: links.instagram,
        medium: links.medium,
      })
      setIsFetchingCollectionDetails(false)
    } catch (error) {}
  }, [])

  useEffect(() => {
    if (mode === "edit") {
      fetchCollectionDetails()
    }
  }, [fetchCollectionDetails])

  return (
    <div className="add-collection-page">
      {isFetchingCollectionDetails ? (
        <div className="loading-circle-container">
          <LoadingCircle />
        </div>
      ) : (
        <>
          <div className="head">
            <BodyText bold className="page-title">
              Add new collection
            </BodyText>
            <BodyText light>
              The top NFTs on OpenSea, ranked by volume, floor price and other
              statistics.{" "}
            </BodyText>
          </div>

          <div className="form">
            <InputBox
              name="name"
              value={input.name}
              placeholder="Name of collection"
              onInputChange={onInputChange}
            />
            <InputBox
              name="bannerImageUrl"
              value={input.bannerImageUrl}
              placeholder="Banner image url"
              onInputChange={onInputChange}
            />
            <InputBox
              name="profileImageUrl"
              value={input.profileImageUrl}
              placeholder="Profile image url"
              onInputChange={onInputChange}
            />
            <InputBox
              name="description"
              value={input.description}
              placeholder="Description"
              onInputChange={onInputChange}
            />
            <BodyText bold className="section-label">
              Links
            </BodyText>
            <div className="links-container">
              <InputBox
                name="website"
                value={input.website}
                placeholder="Website"
                icon="website"
                onInputChange={onInputChange}
              />
              <InputBox
                name="discord"
                value={input.discord}
                placeholder="Discord"
                icon="discord"
                onInputChange={onInputChange}
              />
              <InputBox
                name="twitter"
                value={input.twitter}
                placeholder="Twitter"
                icon="twitter"
                onInputChange={onInputChange}
              />
              <InputBox
                name="telegram"
                value={input.telegram}
                placeholder="Telegram"
                icon="telegram"
                onInputChange={onInputChange}
              />
              <InputBox
                name="medium"
                value={input.medium}
                placeholder="Medium"
                icon="medium"
                onInputChange={onInputChange}
              />
              <InputBox
                name="instagram"
                value={input.instagram}
                placeholder="Instagram"
                icon="instagram"
                onInputChange={onInputChange}
              />
            </div>

            <BodyText bold className="section-label">
              Royalty
            </BodyText>
            <InputBox
              name="royalty"
              value={input.royalty}
              placeholder="eg 2.5"
              onInputChange={onInputChange}
            />
          </div>

          <Button title="Save" onClick={onSubmit} />
        </>
      )}
    </div>
  )
}

export default AddCollectionPage
