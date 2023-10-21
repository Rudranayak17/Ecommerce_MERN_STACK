/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./myOrder.css";

import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

import { useAlert } from "react-alert";

import { clearErrors, myorders } from "../../actions/orderAction";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Launch } from "@mui/icons-material";
import Loader from "../layout/Loader/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        const cellValue = params.value; // Access the cell value directly

        // Check the cell value and apply the appropriate class
        return cellValue === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.row.id}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItem.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myorders());
  }, [alert, dispatch, error]);
  return (
    <>
      <MetaData title={`${user.name}-Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
            className="MyOrdersTable"
            autoHeight
          />
          <Typography style={{color:"black"}} id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </>
  );
};
export default MyOrders;
