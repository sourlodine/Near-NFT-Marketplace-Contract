import { formatNearAmount } from "near-api-js/lib/utils/format"
import BodyText from "../../../../components/BodyText/BodyText"
import NFTItemCard from "../../../../components/NFTItemCard/NFTItemCard"
import { TProfileCollection } from "../../ProfilePage"
import "./CollectionAndAllItemsSet.scss"

const CollectionAndAllItemsSet = (props: { collection: TProfileCollection, listedNfts: any }) => {
  const { collection, listedNfts } = props
  let bExist = false;
  if (collection.items.length > 0)
    bExist = true;
  if (bExist == false && listedNfts) {
    for (let i = 0; i < listedNfts.length; i++) {
      if (collection.id == listedNfts[i].nft_contract_id) {
        bExist = true;
        break;
      }
    }
  }
  if (bExist == false)
    return null
  return (
    <div className="collection-and-items-set">
      <div className="head">
        <img src={collection.imageUrl} alt={collection.name} />
        <BodyText>{collection.name}</BodyText>
      </div>
      <div className="nfts-container">
        {collection.items?.map((item, i) => (
          // https://ipfs.fleek.co/ipfs/bafkreiapfrxlqvay2eod5nog5dcp25hpb67ihhrctl4xg466j52ssiac6i
          <NFTItemCard
            key={i}
            id={item.id}
            collectionId={collection.id}
            image={item.image}
            name={item.name}
            tokenType={item.tokenType}
            collectionTitle={collection.name}
            price={item.price}
          />
        ))}
        {listedNfts?.map((item, i) => (
          collection.id === item.collectionId &&
          <NFTItemCard
            key={i}
            tokenType={item.tokenType}
            id={item.id}
            collectionId={item.collectionId}
            image={item.image}
            name={item.name}
            collectionTitle={item.collectionTitle}
            price={parseFloat(formatNearAmount(item.price.near).replace(',', ''))}
          />
        ))}
      </div>
    </div>
  )
}

export default CollectionAndAllItemsSet
