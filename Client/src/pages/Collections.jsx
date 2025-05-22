import { useLocation } from 'react-router-dom';
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Collections = () => {
  const location = useLocation();
  const year = location.state.year;
  const make = location.state.make;
  const model = location.state.model;
  const baseURL = `https://partifyusa.com/collections/${year}-${String(make).replaceAll(' ', '-')}-${String(model).replaceAll(' ', '-')}/`;

  const [products, setProducts] = useState([]);

  // Call API to get all product types in the database for the specific year, make, and model
  const fetchAPI = async () => {
    const response = await axios.get(`http://localhost:8000/products/?year=${year}&make=${make}&model=${model}`);
    setProducts(response.data.products);
  }

  useEffect(() => {
    fetchAPI();
  }, [])

  return (
    <>
    <div className='collections'>
      <div className='collections-title'>Collections</div>
      <div className='collections-details'>
        <p>Year: {year}</p>
        <p>Make: {make}</p>
        <p>Model: {model}</p>
      </div>
    </div>
    <hr className='line'/>
    <div className='collections-content'>
      Choose which products you want!
    </div>
    <ul className='collections-content'>
      <li><a href={baseURL}>All parts</a></li>
      {products.map((product, i) => {
        return (
          <span key={i}>
          <li></li>
          <li>
            <a href={baseURL + `?filter.p.product_type=${String(product).replaceAll(' ', '+')}`}>
              {product}
            </a>
          </li>
          </span>
        );
      })}
    </ul>
    </>
  )
}

export default Collections