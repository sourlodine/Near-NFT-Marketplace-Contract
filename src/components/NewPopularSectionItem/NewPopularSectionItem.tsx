import { Link } from "react-router-dom"
import "./NewPopularSectionItem.scss"

const NewPopularSectionItem = (props: {
  number: number,
  name: string,
  floorPrice: number,
  weeklyChange: number,
  weeklyVolume: number,
  image: string,
  listItems: number,
  data: any
}) => {
  return (
    <div className="new-popular-item">
      <div className="number">
        {props.number}
      </div>
      <div className="content">
        <div className="content-icon">
          <Link to={`/collection/${props.data.collectionId}/${props.data.tokenType}`}>
            <img
              src={props.image}
              alt=""
            />
          </Link>
        </div>
        <div className="content-text">
          <div className="content-text-top">
            <Link to={`/collection/${props.data.collectionId}/${props.data.tokenType}`}>
              {props.name}
            </Link>
            <span
              className={props.weeklyChange >= 0 ? "green" : "red"}
            >{props.weeklyChange} %</span>
          </div>
          <div className="content-text-bottom">
            <p>Floor Price<span style={{ marginLeft: 10 }}>{props.floorPrice.toLocaleString()} <span style={{ color: "#c2c7d0" }}>Ⓝ</span></span></p>
            <span
              className={props.weeklyChange >= 0 ? "green" : "red"}
            >{props.weeklyVolume.toLocaleString()} <span style={{ color: "#c2c7d0" }}>Ⓝ</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPopularSectionItem
