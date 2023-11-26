const CartRow = ({ product }) => {

  const { id, name, price, imgUrl } = product;
  return <tr key={`product-${id}`}>
    <td className='prod-img '><img className="resp-img" src={imgUrl} alt={name} /></td>
    <td>{name}</td>
    <td>{price}</td>
    <td>{JSON.parse(localStorage.getItem("cart"))[product.id]}</td>
  </tr>
}

export default CartRow