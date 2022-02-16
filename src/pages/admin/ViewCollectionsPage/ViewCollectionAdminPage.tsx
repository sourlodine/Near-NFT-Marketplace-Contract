import React, { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BodyText from "../../../components/BodyText/BodyText"
import Button from "../../../components/Button/Button"
import ImageWithLoadBg from "../../../components/ImageWithLoadBg/ImageWithLoadBg"
import ModalContainer from "../../../components/ModalContainer/ModalContainer"
import { defaultPopularCollections } from "../../../constants/defaultData"
import { ContractContext } from "../../../contexts/contract"
import AdminCollectionCard, {
  AdminCollectionCardProps,
} from "./components/AdminCollectionCard/AdminCollectionCard"
import "./ViewCollectionAdminPage.scss"

const ViewCollectionAdminPage = () => {
  const [collections, setCollections] = useState<AdminCollectionCardProps[]>([])
  const [isFetchingCollections, setIsFetchingCollections] = useState(true)
  const { contract, contractAccountId } = useContext(ContractContext)
  const [collectionToDelete, setCollectionTodelete] = useState(null)
  const navigate = useNavigate()

  const getCollections = useCallback(async () => {
    try {
      // get collections from contract
      // const rawResult: any = await provider.query({
      //   request_type: "call_function",
      //   account_id: contractAccountId,
      //   method_name: "get_collections",
      //   args_base64: btoa(`{sortBy: dateAdded, numberOfResults: 20}`),
      //   finality: "optimistic",
      // })
      // const result = JSON.parse(Buffer.from(rawResult.result).toString())

      const collections = defaultPopularCollections
      setCollections([
        ...defaultPopularCollections,
        ...defaultPopularCollections,
      ])
    } catch (error) {}
  }, [])

  useEffect(() => {
    getCollections()
  }, [getCollections])

  const deleteCollection = async () => {
    try {
      await contract.delete_collection({
        nft_contract_id: contractAccountId,
        token_type: "token_type",
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onEdit = (collection) => {
    navigate("/add-collection", {
      state: {
        mode: "edit",
      },
    })
  }

  return (
    <div className="view-collection-admin-page">
      <ModalContainer
        isVisible={collectionToDelete}
        className="view-collection-page-modal"
        onClose={() => setCollectionTodelete(null)}
      >
        <div className="delete-confirm-modal">
          <ImageWithLoadBg
            aspectRatio={1}
            alt={collectionToDelete?.name}
            src={collectionToDelete?.image}
          />
          <BodyText bold className="collection-name">
            {collectionToDelete?.name}
          </BodyText>
          <BodyText>Are you sure you want to delete?</BodyText>
          <div className="btns-container">
            <Button
              className="delete-btn"
              title="Delete"
              onClick={deleteCollection}
            />
            <Button
              secondary
              title="Cancel"
              onClick={() => setCollectionTodelete(null)}
            />
          </div>
        </div>
      </ModalContainer>
      <div className="head">
        <BodyText bold className="page-title">
          Admin View Collections Page
        </BodyText>
        <BodyText light>
          The top NFTs on OpenSea, ranked by volume, floor price and other
          statistics.
        </BodyText>
      </div>
      <div className="collections-container">
        {collections.map((collection, i) => (
          <AdminCollectionCard
            image={collection.image}
            name={collection.name}
            id={collection.id}
            key={i}
            onEditClick={() => onEdit(collection)}
            onDeleteClick={() => setCollectionTodelete(collection)}
          />
        ))}
      </div>
    </div>
  )
}

export default ViewCollectionAdminPage
