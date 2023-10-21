/* eslint-disable react/prop-types */
import "./Header.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Dashboard, Person, ShoppingCart } from "@mui/icons-material";
import { ListAlt } from "@mui/icons-material";
import { ExitToApp } from "@mui/icons-material";
import {  Backdrop} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {logout  } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {

  const {cartItems}=useSelector(state=>state.cart)
    const dispatch=useDispatch()
  let profile =
    "https://www.shutterstock.com/image-vector/man-icon-vector-250nw-1040084344.jpg";
  const [open, setOpen] = useState(false);
  const navigate=useNavigate()
  const alert =useAlert()

  const options = [
    { icon: <ListAlt />, name: "Order", func: orders },
    { icon: <Person />, name: "Profile", func: account },
    { icon: <ShoppingCart style={{color:cartItems.length>0?"tomato":"unset"}} />, name: `cart(${cartItems.length})`, func: cart },
    { icon: <ExitToApp />, name: "Logout", func: logoutUser },
  ];
if (user.role === "admin") {
    options.unshift(    { icon: <Dashboard />, name: "Dashboard", func: dashboard },)
}
function dashboard() {
    navigate("/admin/dashboard")
}
function orders() {
    navigate("/orders")
}
function account() {
    navigate("/account")
}
function cart() {
    navigate("/cart")
}
function logoutUser() {
    dispatch(logout());
alert.success("Logout Successfully")

}
  return (
    <>
    <Backdrop open={open}  style={{zIndex:"10"}} />
      <SpeedDial
        direction="down"
        ariaLabel="speedDail tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{zIndex:"11"}}
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : profile}
            alt="Profile"
          />
        }
      >
        {
            options.map((item,i)=>(
                <SpeedDialAction key={i} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth<=600 ?true:false} />
            ))
        }
      </SpeedDial>
    </>
  );
};
export default UserOptions;
