import './Card.css'

export default function Card(props) {
  return (
    <div className="card">
      <img className="card-image" src={props.image} alt="Product Image"/>
      <div className="card-info">
        <p>{props.name}</p>
        <p>{props.price}</p>
      </div>
    </div>
  )
}
