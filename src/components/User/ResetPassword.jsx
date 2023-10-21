import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import { Lock, LockOpen } from "@mui/icons-material";
import Loader from "../layout/loader/loader";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const {token} = useParams()
  const alert = useAlert();

  const { error, success, loading } = useSelector((state) => state.forgotPassword);


  const [password, setPssword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token,myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password updated successfully");

      navigate("/login");
   
    }
  }, [dispatch, error, alert, success, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Change Password"} />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
               
                <div >
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPssword(e.target.value)}
                  />
                </div>
                <div className="">
                  <Lock />
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
                  value="Update "
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ResetPassword;
