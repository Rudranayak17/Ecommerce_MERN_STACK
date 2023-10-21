/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";

import { Face, MailOutline } from "@mui/icons-material";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";

import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/loader";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
 
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");

  let profile =
    "https://www.shutterstock.com/image-vector/man-icon-vector-250nw-1040084344.jpg";
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);

    myForm.set("avatar", avatar); // Ensure that 'avatar' contains the file data
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (user) {
      setname(user.name);
      setEmail(user.email);
     if (user.avatar && user.avatar.url) {
  setAvatarPreview(user.avatar.url);
}

    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile updated successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, user, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) :  (
        <>
          <MetaData title={"Update Profile"} />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <Face />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e)=>setname(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                {avatarPreview && (
  <img src={ avatarPreview} alt="Avatar Preview" />
)}

                  <input
                  required
       
          
                type="file"
                name="avatar"
                accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      ) }
    </>
  );
};
export default UpdateProfile;
