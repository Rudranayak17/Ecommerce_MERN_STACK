import  { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct ,getProductDetails} from "../../actions/productAction";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";

import SideBar from "./SideBar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from "@mui/icons-material";
import { Button } from "@mui/material";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {id}=useParams()

 const  navigate=useNavigate()
  const { loading, error:updateError, isUpdated } = useSelector((state) => state.product);
const{error,product}=useSelector((state)=>state.productDetails)
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    }
    else{
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.stock);
        setOldImages(product.images)
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate,id,product,isUpdated,updateError ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);


    images.forEach((image) => {
        myForm.append("images", image);
      });
      dispatch(updateProduct(id,myForm));
    };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
  
    // Reset the previous images and previews
    setImages([]);
    setImagesPreview([]);
    setOldImages([])
  
    // Loop through each selected file
    files.forEach((file) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          // Append the file object to the images state
          setImages((oldImages) => [...oldImages, reader.result]);
  
          // Append the reader result (image preview) to the imagesPreview state
          setImagesPreview((oldPreviews) => [...oldPreviews, reader.result]);
        }
      };
  
      reader.readAsDataURL(file);
    });
  };
  

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <Spellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoney />
              <input
              value={price}
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <Description />

              <textarea
                placeholder="Product Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTree />
              <select value={category} required onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Storage />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
              
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple 
              />
            </div>

            <div id="createProductFormImage">
              {oldImages && oldImages.map((image, index) => (
                <img key={index} src={image.url} alt=" Old Product Preview" />
              ))}
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};


export default UpdateProduct