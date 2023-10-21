/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import "./UpdatePasswoard.css";



import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors,  updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";

import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";
import { Lock, LockOpen, VpnKey } from "@mui/icons-material";
import Loader from "../layout/loader/loader";


const UpdatePassword = () => {

    const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
 
  const [oldpassword, setOldPssword] = useState("");
  const [newpassword, setNewPssword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  let profile =
    "https://www.shutterstock.com/image-vector/man-icon-vector-250nw-1040084344.jpg";


  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldpassword);
    myForm.set("newPassword", newpassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

 
  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile updated successfully");
    
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) :  (
        <>
          <MetaData title={"Change Password"} />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>
              <form
                className="updatePasswordForm"
              
                onSubmit={updatePasswordSubmit}
              >
               <div className="loginPassword">
                  <VpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldpassword}
                    onChange={(e) => setOldPssword(e.target.value)}
                  />
                </div>
               <div className="loginPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newpassword}
                    onChange={(e) => setNewPssword(e.target.value)}
                  />
                </div>
               <div className="loginPassword">
                  <Lock/>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Change Password"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      ) }
    </>
  )
}
export default UpdatePassword