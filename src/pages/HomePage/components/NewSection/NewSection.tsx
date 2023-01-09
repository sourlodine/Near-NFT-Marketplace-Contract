import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BodyText from "../../../../components/BodyText/BodyText"
import Button from "../../../../components/Button/Button"
import CollectionCard from "../../../../components/CollectionCard/CollectionCard"
import SectionPadding from "../../../../components/SectionPadding/SectionPadding"
import { CollectionContext } from "../../../../contexts/collections"
import { TCollection } from "../../../CollectionPage/CollectionPage"
import "./NewSection.scss"

const NewSection = () => {
  const { collections } = useContext(CollectionContext)
  const [newCollections, setNewCollections] = useState<TCollection[]>([])
  useEffect(() => {
    let collectionArray = [];
    for (let i = 0; i < collections.length; i++) {
      collectionArray.push(collections[i]);
    }
    collectionArray.sort((a, b) => {
      return (b.updated_at - a.updated_at)
    })
    setNewCollections(collectionArray.slice(0, 4))
  }, [collections])
  return (
    <div className="home-collections-section">
      <SectionPadding>
        <div className="head">
          <BodyText className="section-title-text">New</BodyText>
          <Link to="/collections">
            <Button title="See All" onClick={() => { }} secondary disabled={false} />
          </Link>
        </div>
        <div className="cards-container">
          {newCollections.map((item, i) => (
            <CollectionCard
              key={i}
              id={item.collectionId}
              tokenType={item.tokenType}
              image={item.profileImageUrl}
              name={item.name}
            />
          ))}
        </div>
      </SectionPadding>
    </div>
  )
}

export default NewSection
