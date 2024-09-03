import Input from '../Account/Input';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

function Profile() {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector(state => state.auth);
  const [formValues, setFormValues] = useState({
    name: user.user_details.name,
    email: user.user_details.email,
    username: user.user_details.username,
    phone_number: user.user_details.phone_number,
  });

  const defaultImage = 'images/profile.jpg';

  const handleImageClick = () => {
    inputRef.current.value = null;
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(file);
      setImage(imageUrl);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleEditDetails = () => {
    setIsEditing(true);
  };


  const handleSaveDetails = async () => {
    console.log(formValues)
    const name = formValues.name;
    const email = formValues.email;
    const username = formValues.username;
    const phone_number = formValues.phone_number;

    const userValues = {
      name,
      username,
      email,
      phone_number,
    };

    console.log(user.access_token)
    axios.post(`${import.meta.env.VITE_API_URL}api/update/user/${user.user_details.id}`,
      userValues,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        }
      }
    ).then((response) => {

      console.log(response.data);
      if (response.data.status === true) {
        setError('');
        toast.success(response.data.message);
      }
    }).catch((error) => {
      const errorMessage = error?.response?.data?.errors;
      setError(errorMessage ? errorMessage : {});
      console.log(error)
    }
    )
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

  const imageSrc = image || defaultImage;

  return (
    <div className='h-screen flex justify-center mt-4'>
      <div className='w-[95%] h-fit pt-7 pb-7 bg-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] space-y-8'>
        <div className='ml-9'>
          <h1 className='text-xl font-bold text-orange-600'>Personal Info</h1>
          <p>You can update your profile photo and personal details here.</p>
        </div>
        <div className='flex items-center gap-8 ml-9'>
          <img
            src={imageSrc}
            alt="Profile"
            className='w-[90px] h-[90px] rounded-md object-cover object-top drop-shadow-[0_6px_5px_rgba(0,0,0,0.15)] cursor-pointer'
          />
          <div className='flex flex-col gap-y-1'>
            <button
              type='button'
              onClick={handleImageClick}
              className='border-2 border-blue-500 h-10 w-28 rounded-lg text-blue-500 text-sm font-medium hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50'
            >
              Change Profile
            </button>
            {image && (
              <button type='button'
                onClick={handleDeleteImage}
                className='border-2 border-red-500 h-10 w-28 rounded-lg text-red-500 text-sm font-medium hover:border-red-600 hover:text-red-600 hover:bg-red-50'
              >
                Delete Profile
              </button>
            )}
            <input type="file" ref={inputRef} onChange={handleImageChange} className='hidden' />
          </div>
        </div>
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
