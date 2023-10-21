import { CgMouse } from "react-icons/cg";
import  "./Home.css";
import Product from './ProductCard.jsx';
import MetaData from "../layout/MetaData";
import {clearErrors, getProduct} from "../../actions/productAction.js";
import {  useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/loader/loader";

import {useAlert} from "react-alert";



const Home = () => {
  const alert=useAlert()
  const dispatch=useDispatch()
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
 
if (error) {
   alert.error(error)
   dispatch(clearErrors())
}
    dispatch(getProduct())
  }, [dispatch,error,alert]);
  return (
<>
  {loading ?(<Loader/>):    <>
    <MetaData title={"Ecommerce"}/>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCT BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Feature Products</h2>
      <div className="container" id="container">
      {products && products.map(product=>(  <Product key={product._id} product={product}/>))}
    
      </div>
    </>}
</>
  );
};

export default Home;
