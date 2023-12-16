import './mainPage.css'
import ItemList from "../ItemsList";
import Cart from '../Cart';
import useSetProducts from '../../hooks/useSetProducts';


const MainPage = () => {
  const products = useSetProducts();
  if (products.loading) return "...loading";

  return <>
    <ItemList data={products.data} />
    <Cart />
  </>;
}

export default MainPage;