import Item from '../Item';
import './itemlist.css';

const ItemList = ({ data }) => {
  return (<div id='itemlist'>{data.map((item, index) => <Item key={`key-${item.id}-${index}`} itemData={item} />)}</div>);
}

export default ItemList;