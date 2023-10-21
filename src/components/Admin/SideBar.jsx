import "./sidebar.css";
import logo from "./../images/logo .png";
import { Link } from "react-router-dom";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import {
  Add,
  Dashboard,
  ExpandMore,
  ImportExport,
  ListAlt,
  People,
  PostAdd,
} from "@mui/icons-material";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to={"/"}>
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to={"/admin/dashboard"}>
        <p>
          <Dashboard />
          DashBoard
        </p>
      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ImportExport />}
        >
          <TreeItem className="top" nodeId="1" label="Products">
            <Link  to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
            </Link>
            <Link style={{marginTop:"12px"}}  to={"/admin/product"}>
              <TreeItem nodeId="3" label="Create" icon={<Add />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to={"/admin/orders"}>
        <p>
          <ListAlt />
          Orders
        </p>
      </Link>
      <Link to={"/admin/users"}>
        <p>
          <People />
          User
        </p>
      </Link>
    </div>
  );
};
export default SideBar;
