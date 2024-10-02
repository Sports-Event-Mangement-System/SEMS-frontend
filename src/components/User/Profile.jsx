import Input from '../Ui/Input';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteProfileImage, updateProfileImage, updateUser } from '../../store/UserSlice';
import { IoCameraOutline } from "react-icons/io5";

function Profile() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector(state => state.auth);
  const [formValues, setFormValues] = useState({
    access_token: user.access_token,
    id: user.user_details.id,
    name: user.user_details.name,
    email: user.user_details.email,
    username: user.user_details.username,
    phone_number: user.user_details.phone_number,
    profile_image: user.user_details.profile_image,
  });

  const handleImageClick = (event) => {
    event.preventDefault();
    const profile_image = selectedFile;
    const id = formValues.id;
    const access_token = formValues.access_token;


    // // Create a FormData object
    const userProfileImage = {
      profile_image,
      id,
      access_token,
    };
    dispatch(updateProfileImage({ userProfileImage })).then((result) => {
      if (result.payload.status === true) {
        toast.success(result.payload.message);
        setSelectedFile(null);
      } else {
        setError(result.payload);
      }
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageSrc(previewUrl);
      setSelectedFile(file);
    }
  };


  const triggerFileInput = () => {
    inputRef.current.click();
  };

  const handleDeleteImage = () => {
    const id = formValues.id;
    const access_token = formValues.access_token;

    const data = {
      id,
      access_token,
    }

    dispatch(deleteProfileImage({ data })).then((result) => {
      if (result.payload.status === true) {
        toast.success(result.payload.message);
        setFormValues((prev) => ({
          ...prev,
          profile_image: null,
        }));
        setSelectedFile(null);
        setImageSrc('');

        inputRef.current.value = '';
      } else {
        setError(result.payload);
      }
    });
  };


  const handleEditDetails = () => {
    setIsEditing(true);
  };


  const handleSaveDetails = async () => {
    const access_token = formValues.access_token;
    const id = formValues.id;
    const name = formValues.name;
    const email = formValues.email;
    const username = formValues.username;
    const phone_number = formValues.phone_number;

    const userValues = {
      access_token,
      id,
      name,
      username,
      email,
      phone_number,
    };
    dispatch(updateUser(userValues)).then((result) => {
      if (result.payload.status === true) {
        toast.success(result.payload.message);
      }
      else {
        console.log(result.payload);
        setError(result.payload);
      }
    });
  };
  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='h-screen flex justify-center mt-4'>
      <div className='w-[95%] h-fit pt-7 pb-7 bg-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] space-y-8'>
        <div className='ml-9'>
          <h1 className='text-xl font-bold text-orange-600'>Personal Info</h1>
          <p>You can update your profile photo and personal details here.</p>
        </div>
        <form onSubmit={handleImageClick} action="">
          <div className='flex items-center gap-8 ml-9'>
            <div className="relative w-[90px] h-[90px] group cursor-pointer" onClick={triggerFileInput}>
              <img
                src={imageSrc || (formValues.profile_image ? formValues.profile_image : 'images/profile.jpg')}
                alt="Profile"
                className="w-full h-full rounded-md object-cover object-top drop-shadow-[0_6px_5px_rgba(0,0,0,0.15)] cursor-pointer"
              />
              <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-md"></div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <span className='text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'><IoCameraOutline size={30} /></span>
              </div>
            </div>


            <div className='flex flex-col gap-y-1'>
              {selectedFile && <button
                className='border-2 border-blue-500 h-10 w-28 rounded-lg text-blue-500 text-sm font-medium hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50'
              >
                Change Profile
              </button>}

              {formValues.profile_image && (
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className='border-2 border-red-500 h-10 w-28 rounded-lg text-red-500 text-sm font-medium hover:border-red-600 hover:text-red-600 hover:bg-red-50'
                >
                  Delete Profile
                </button>
              )}
              <input type="file" name='profile_image' onChange={handleImageChange} ref={inputRef} className='hidden' />
              {error.profile_image?.[0] && (
                <span className="text-red-500 text-md">
                  {error.profile_image?.[0]}
                </span>
              )}
            </div>
          </div>
        </form>
        <div className='flex justify-evenly'>
          <form className='flex flex-col w-[95%] gap-y-4'>

            <Input
              label="Name"
              type="text"
              name="name"
              required={true}
              value={formValues.name}
              readOnly={!isEditing}
              onChange={handleChange}
            />{error.name && (
              <span className="text-red-500 text-md">
                {error.name}
              </span>
            )}

            <Input
              label="Email"
              type="text"
              name="email"
              required={true}
              value={formValues.email}
              readOnly={!isEditing}
              onChange={handleChange}
            />{error.email && (
              <span className="text-red-500 text-md">
                {error.email}
              </span>
            )}

            <Input
              label="Username"
              type="text"
              name="username"
              required={true}
              value={formValues.username}
              readOnly={!isEditing}
              onChange={handleChange}
            />{error.username && (
              <span className="text-red-500 text-md">
                {error.username}
              </span>
            )}

            <Input
              label="Phone Number"
              type="text"
              name="phone_number"
              required={true}
              value={formValues.phone_number}
              readOnly={!isEditing}
              onChange={handleChange}
            />{error.phone_number && (
              <span className="text-red-500 text-md">
                {error.phone_number}
              </span>
            )}


            <div className='flex gap-4'>
              <button
                type="button"
                onClick={isEditing ? handleSaveDetails : handleEditDetails}
                className={`h-10 w-28 rounded-lg text-white text-sm font-medium ${isEditing ? 'bg-blue-600 hover:bg-blue-500' : 'bg-orange-600 hover:bg-orange-500'}`}
              >
                {isEditing ? 'Save Details' : 'Edit Details'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancelEditing}
                  className='bg-gray-500 h-10 w-28 rounded-lg text-white text-sm font-medium hover:bg-gray-400'
                >
                  Cancel
                </button>
              )}
              {!isEditing && (
                <ul className='flex items-center mx-7'>
                  <li><Link to="/changepassword" className='font-semibold text-[16px] underline text-gray-700 hover:text-orange-600'>Change Password ?</Link></li>
                </ul>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
