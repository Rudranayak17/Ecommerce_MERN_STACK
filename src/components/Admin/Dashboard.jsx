import { Typography } from "@mui/material";
import "./dashboard.css";
import SideBar from "./SideBar.jsx";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";

import { getAllUsers } from "../../actions/userAction";
ChartJS.register(
  
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const Dashboard = () => {
  const {products}=useSelector((state)=>state.products) 
  const {orders}=useSelector((state)=>state.allorders) 
  const {  users } = useSelector((state) => state.allUsers);
const dispatch=useDispatch()
let outStock=0

products && products.forEach((item)=>{
  if (item.stock===0) {
    outStock+=1
  }
})

useEffect(() => {
  dispatch(getAdminProduct())
  dispatch(getAllOrders())
  dispatch(getAllUsers())
}, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out Of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outStock, products.length-outStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboardContainer">
        <Typography component={"h1"}> DashBoard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> 20000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to={"/admin/products"}>
              <p>products</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to={"/admin/orders"}>
              <p>orders</p>
              <p>{orders &&orders.length}</p>
            </Link>
            <Link to={"/admin/users"}>
              <p>users</p>
              <p>{users &&users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState}  />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
