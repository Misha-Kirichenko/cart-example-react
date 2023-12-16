import { useContext, useEffect, useState } from 'react';
import './cartPage.css';
import CartRow from '../CartRow';
import CartContext from '../../contexts/cartContext';

const CartPage = () => {
  const [addedProducts, setAddedProducts] = useState({ data: [], loading: true });

  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:3001/products").then(res => {
      if (res.ok) return res.json();
    }).then(res => {
      const cartAssoc = JSON.parse(localStorage.getItem("cart")) || {};
      const addedItems = res.filter(product => cartAssoc[product.id]);
      setAddedProducts({ data: addedItems, loading: false });
    });
  }, [])

  /* რეალურ პროექტში ყველა პროდუქტს არ მოვითხოვთ სერვერიდან,
  სერვერზე POST მეთოდით უნდა გაიგზავნოს პროდუქტების id - ბის მასივი და backend-სგან ვიღებთ ამ id - ბის შესაბამის პროდუქტების სიას.
  უბრალოდ json სერვერი არ გვაძლევს ამის შესაძლებლობას
  */

  if (addedProducts.loading) return "...loading";

  if (!addedProducts.data.length && !addedProducts.loading) return "No Items added";

  const sum = addedProducts.data.reduce((prev, next) => {
    prev += next.price * cartItems[next.id];
    return prev;
  }, 0)

  return <table>
    <thead>
      <tr>
        <th></th>
        <th>name</th>
        <th>price</th>
        <th>quantity</th>
        <th>subtotal</th>
      </tr>
    </thead>
    <tbody>
      {
        addedProducts.data.map(product => <CartRow product={product} key={product.id} onSetAddedProducts={setAddedProducts} />)
      }
    </tbody>
    <tfoot>
      <tr>
        <td colSpan={4}><b>Sum</b>: {sum}</td>
      </tr>
    </tfoot>
  </table>;
}

export default CartPage;