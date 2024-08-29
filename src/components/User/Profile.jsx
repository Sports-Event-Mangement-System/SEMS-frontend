import Input from '../Account/Input';
import React, { useRef, useState } from 'react';

function Profile() {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: 'Subash',
    email: 'subashtmg217@gmail.com',
    username: 'subash217',
    phone_number: '123456789',
  });

  const [formValues, setFormValues] = useState({ ...initialValues });
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

  const handleSaveDetails = () => {
    setIsEditing(false);
    setInitialValues({ ...formValues });
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setFormValues({ ...initialValues });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const imageSrc = image || defaultImage;

  const inputFields = [
    { label: "Name", type: "text", name: "name" },
    { label: "Email", type: "email", name: "email" },
    { label: "Username", type: "text", name: "username" },
    { label: "Phone number", type: "text", name: "phone_number" },
  ];

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
            {inputFields.map((field) => (
              <Input
                key={field.name}
                label={field.label}
                type={field.type}
                name={field.name}
                required={true}
                value={formValues[field.name]}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            ))}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
