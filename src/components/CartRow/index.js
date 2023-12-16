import { useContext } from "react";
import CartContext from "../../contexts/cartContext";

const CartRow = ({ product, onSetAddedProducts }) => {

  const { cartItems, setCartItems } = useContext(CartContext);
  const { id, name, price, imgUrl } = product;

  const changeCartItemQuantity = (e) => {
    const { value } = e.target;
    setCartItems((items) => {
      const newQuantities = {
        ...items,
        [id]: Number(value)
      }

      localStorage.setItem("cart", JSON.stringify(newQuantities));
      return newQuantities;
    })
  }

  const deleteProduct = () => {
    setCartItems(items => {
      const newItemsList = { ...items };
      delete newItemsList[id];
      localStorage.setItem("cart", JSON.stringify(newItemsList));
      return newItemsList;
    });

    onSetAddedProducts((products) => {
      const filteredProductsList = products.data.filter(product => product.id !== id);
      return { data: filteredProductsList, loading: false };
    })
  }

  return <tr key={`product-${id}`}>
    <td className='prod-img '><img className="resp-img" src={imgUrl} alt={name} /></td>
    <td>{name}</td>
    <td>{price}</td>
    <td><input type="number" value={cartItems[id]} onChange={changeCartItemQuantity} min={1} /></td>
    <td>{cartItems[id] * price}</td>
    <td><i className="fa fa-trash-o" style={{ cursor: "pointer" }} onClick={deleteProduct}></i></td>
  </tr>
}

export default CartRow