import "./product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/loader/loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";


const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhone",
];

const Products = () => {
  const { keyword } = useParams();

  const dispatch = useDispatch();
  const alert = useAlert()
  const [ratings,setRatings]=useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 125500]);
  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
    console.log(newPrice);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct(keyword, currentPage, price,category,ratings));
  }, [dispatch, keyword, currentPage, price,category,ratings,alert,error]);

  // let count=filtereredProduct

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"All Products"} />
      
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => {
                return <li
                  key={category}
                  className="category-link"
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>;
              })}
            </ul>
            <fieldset >
              <Typography component={"legend"}>Rating Above</Typography>
              <Slider
                value={ratings}
                valueLabelDisplay="auto"
                onChange={(e,newRating) => {setRatings(newRating)}}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < productsCount && products.length < resultPerPage ? (
           <div style={{display:"flex",fontSize:"2.0rem" ,textAlign:"center",justifyContent:"center", }}>
<p >No Product Found </p>
<a style={{color:"red"}} href="/products">Back</a>
           </div>
          ) : (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"1st"}
                lastPageText={"last"}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Products;
