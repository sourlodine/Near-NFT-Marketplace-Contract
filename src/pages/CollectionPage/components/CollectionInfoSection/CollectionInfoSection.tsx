import { useEffect, useState } from "react"
import DiscordIcon from "../../../../assets/icons/DiscordIcon"
import InstagramIcon from "../../../../assets/icons/InstagramIcon"
import MediumIcon from "../../../../assets/icons/MediumIcon"
import TelegramIcon from "../../../../assets/icons/TelegramIcon"
import TwitterIcon from "../../../../assets/icons/TwitterIcon"
import VerifiedIcon from "../../../../assets/icons/VerifiedIcon"
import WebsiteIcon from "../../../../assets/icons/WebsiteIcon"
import BodyText from "../../../../components/BodyText/BodyText"
import { getCollectionStat } from "../../../../contexts/transaction"
import { TCollection, TCollectionContractDetails } from "../../CollectionPage"
import "./CollectionInfoSection.scss"

interface CollectionInfoSectionProps {
  collectionMarketplaceDetails: TCollection | null
  collectionContractDetails: TCollectionContractDetails
  isLoading: boolean,
  collectionId: string
}
const CollectionInfoSection = (props: CollectionInfoSectionProps) => {
  const { collectionMarketplaceDetails, collectionContractDetails, collectionId } = props
  const [totaValue, setTotalValue] = useState("--");
  const getAllCollections = async () => {
    const all = await getCollectionStat();
    for (let item of all) {
      if (item.collectionId === collectionId) {
        setTotalValue(`${(item.volumeTotal.toLocaleString()).toString()} Ⓝ`)
      }
    }
  }
  useEffect(() => {
    getAllCollections();
  }, [])
  return (
    <div className="collection-info-section">
      <div className="banner-section">
        <div className="collection-links">
          {collectionMarketplaceDetails?.links.website && (
            <a
              href={collectionMarketplaceDetails?.links.website}
              rel="noreferrer"
              target="_blank"
            >
              <WebsiteIcon />
            </a>
          )}
          {collectionMarketplaceDetails?.links.discord && (
            <a
              href={collectionMarketplaceDetails?.links.discord}
              rel="noreferrer"
              target="_blank"
            >
              <DiscordIcon />
            </a>
          )}
          {collectionMarketplaceDetails?.links.telegram && (
            <a
              href={collectionMarketplaceDetails?.links.telegram}
              rel="noreferrer"
              target="_blank"
            >
              <TelegramIcon />
            </a>
          )}
          {collectionMarketplaceDetails?.links.medium && (
            <a
              href={collectionMarketplaceDetails?.links.medium}
              rel="noreferrer"
              target="_blank"
            >
              <MediumIcon />
            </a>
          )}
          {collectionMarketplaceDetails?.links.instagram && (
            <a
              href={collectionMarketplaceDetails?.links.instagram}
              rel="noreferrer"
              target="_blank"
            >
              <InstagramIcon />
            </a>
          )}
          {collectionMarketplaceDetails?.links.twitter && (
            <a
              href={collectionMarketplaceDetails?.links.twitter}
              rel="noreferrer"
              target="_blank"
            >
              <TwitterIcon />
            </a>
          )}
        </div>
        <div className="image-container">
          <div className="darkener" />
          <img
            src={collectionMarketplaceDetails?.bannerImageUrl}
            alt="collection"
          />
        </div>
      </div>
      <div className="details-container">
        <div className="collection-image-container">
          <img
            src={collectionMarketplaceDetails?.profileImageUrl}
            alt={collectionMarketplaceDetails?.name}
          />
        </div>
        <div className="name-container">
          <BodyText bold>{collectionMarketplaceDetails?.name}</BodyText>
          {collectionMarketplaceDetails?.isVerified && (
            <div className="verified-icon">
              <VerifiedIcon />
            </div>
          )}
        </div>
        <BodyText className="creator-text">
          Created by
          <span className="green">{` ${collectionMarketplaceDetails?.creator}`}</span>
        </BodyText>
        <BodyText light className="description">
          {collectionMarketplaceDetails?.description}
        </BodyText>
      </div>
      <div className="collection-stats-container">
        <div className="stat-set">
          {collectionContractDetails?.numberOfItems ?
            <BodyText bold>{collectionContractDetails?.numberOfItems}</BodyText>
            :
            <p className="body-text bold">--</p>
          }
          <BodyText light>Items</BodyText>
        </div>
        <div className="stat-set">
          {collectionContractDetails?.floorPrice ?
            <BodyText bold>
              {collectionContractDetails?.floorPrice}
              <span style={{ marginLeft: "5px" }}>Ⓝ</span>
            </BodyText>
            :
            <p className="body-text bold">--</p>
          }
          <BodyText light>Floor price</BodyText>
        </div>
        <div className="stat-set">
          <BodyText bold>
            <span style={{ marginLeft: "5px" }}>{totaValue}</span>
          </BodyText>
          <BodyText light>Volume traded</BodyText>
        </div>
      </div>
    </div>
  )
}

export default CollectionInfoSection
