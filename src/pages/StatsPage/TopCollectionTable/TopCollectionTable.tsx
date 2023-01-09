import { Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import BodyText from "../../../components/BodyText/BodyText"
import { getCollectionStat } from "../../../contexts/transaction"
import "./TopCollectionTable.scss"
import { Link } from "react-router-dom"

type TCollectionLinks = {
  discord?: string
  twitter?: string
  website?: string
  telegram?: string
  instagram?: string
  medium?: string
}

export type TCollections = {
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

const TopCollectionTable = (props: {}) => {

  const [tableData, setTableData] = useState<any>()

  const [isLoading, setIsLoading] = useState(true)

  const getAllCollections = async () => {
    setIsLoading(true)
    const all = await getCollectionStat();
    all.sort(function (a: any, b: any) {
      return b.volumeTotal - a.volumeTotal
    })
    console.log(all, "all data")
    setTableData(all)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllCollections()
  }, [])

  return (
    <table className="top-collection-table">
      <thead>
        <tr>
          <th>
            <BodyText light>#</BodyText>
          </th>
          <th>
            <BodyText light>Collection</BodyText>
          </th>
          <th>
            <BodyText light>NFT Floor Price</BodyText>
          </th>
          <th>
            <BodyText light>Daily Volume</BodyText>
          </th>
          <th>
            <BodyText light>Daily Volume Change</BodyText>
          </th>
          <th>
            <BodyText light>Average Price</BodyText>
          </th>
          {/* <th>
            <BodyText light>Average Price %</BodyText>
          </th> */}
          <th>
            <BodyText light>Weekly Volume</BodyText>
          </th>
          <th>
            <BodyText light>Weekly Volume Change</BodyText>
          </th>
          <th>
            <BodyText light>Total Volume</BodyText>
          </th>
        </tr>
      </thead>
      <tbody>
        {isLoading ?
          <>
            <tr>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              {/* <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td> */}
            </tr>
            <tr>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td>
              {/* <td>
                <Skeleton animation="wave" style={{ width: "100%", height: 20, backgroundColor: "#ffffff3b" }} />
              </td> */}
            </tr>
          </>
          :
          tableData && tableData?.map((collection, i) => (
            <tr key={i}>
              <td className="number">
                <BodyText>{i + 1}</BodyText>
              </td>
              <td>
                <div className="collection-name-and-img-column">
                  <Link to={`/collection/${collection.collectionId}/${collection.tokenType}`} >
                    <img src={collection.profileImageUrl} alt={collection.name} />
                    <BodyText className="collection-title">
                      {collection.name}
                    </BodyText>
                  </Link>
                </div>
              </td>
              <td>
                <BodyText className="mobile-title">NFT Floor Price</BodyText>
                <BodyText light>{collection.floorPrice.toLocaleString()}</BodyText>
              </td>
              <td>
                <BodyText className="mobile-title">Daily Volume</BodyText>
                <BodyText light>{collection.dailyVolume}</BodyText>
              </td>
              <td>
                <BodyText className="mobile-title">Daily Volume Change</BodyText>
                <BodyText light className={
                  parseFloat(collection.dailyChange) > 0 ? "green" : "red"
                }>{parseFloat(collection.dailyChange).toLocaleString()}%</BodyText>
              </td>
              <td>
                <BodyText className="mobile-title">Average Price</BodyText>
                <BodyText light>{parseFloat(collection.avgPrice).toLocaleString()}</BodyText>
              </td>
              {/* <td>
                <BodyText className="mobile-title">Average Price %</BodyText>
                <BodyText light className={
                  parseFloat(collection.avgPrice) > 0 ? "green" : "red"
                }>{parseFloat(collection.avgPrice).toLocaleString()}</BodyText>
              </td> */}
              <td>
                <BodyText className="mobile-title">Weekly Volume</BodyText>
                <BodyText light>{parseFloat(collection.weeklyVolume).toLocaleString()}</BodyText>
              </td>
              <td>
                <BodyText className="mobile-title">Weekly Volume Change</BodyText>
                <BodyText light className={
                  parseFloat(collection.weeklyChange) > 0 ? "green" : "red"
                }>{parseFloat(collection.weeklyChange).toLocaleString()}%</BodyText>
              </td>
              <td>
                <BodyText className="mobile-title">Total Volume</BodyText>
                <BodyText light>{parseFloat(collection.volumeTotal).toLocaleString()}</BodyText>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default TopCollectionTable
