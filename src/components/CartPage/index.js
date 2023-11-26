import { useEffect, useState } from 'react';
import './cartPage.css';
import CartRow from '../CartRow';

const CartPage = () => {
  const [addedProducts, setAddedProducts] = useState({ data: [], loading: true });
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

  return <table>
    <thead>
      <tr>
        <th></th>
        <th>name</th>
        <th>price</th>
        <th>quantity</th>
      </tr>
    </thead>
    <tbody>
      {
        addedProducts.data.map(product => <CartRow product={product} />)
      }
    </tbody>
  </table>;
}

export default CartPage;