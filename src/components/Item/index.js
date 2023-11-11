import './item.css'

const Item = ({ itemData }) => {
  return (<div className="item">
    <div className="item-image"><img src={itemData.imgUrl} className="resp-img" /></div>
    <p><b>Name:</b>{itemData.name}</p>
    <div><b>Description:</b><p>{itemData.description}</p></div>
    <p><b>Price:</b>{itemData.price}$</p>
    <p><input type="number" className="item-price" defaultValue={1} min={1} /></p>
    <p><button>Add to cart</button></p>
  </div>);
}

export default Item;