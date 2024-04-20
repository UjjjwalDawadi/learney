import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import axios from 'axios';
import { BsDashLg } from 'react-icons/bs';
import { TbCameraPlus,TbReportMoney } from 'react-icons/tb';
import { TiDocumentText, TiBookmark, TiShoppingCart ,TiTick, TiUser } from 'react-icons/ti'; // Importing icons
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function UserDetails({ userData, totalEnrolledCourses, totalBookmarkedCourses, totalCoursesInCart,
   totalCoursesCompleted,totalStudents,totalCoursesUploaded,totalRevenue}) {
  const userRole = localStorage.getItem('userRole');
  return (
    <div>
{userRole === 'Student' &&
      <div className="statistics-container">
        {/* Box for total enrolled courses */}
        <div className="statistics-box">
          <div className="box-item">
            <TiDocumentText size={36} color="white" />
            <h2>Total Enrollments</h2>
            <p>{totalEnrolledCourses}</p>
          </div>
        </div>
        {/* Box for total bookmarked courses */}
        <div className="statistics-box">
          <div className="box-item">
            <TiBookmark size={36} color="white" />
            <h2>Total Bookmarks</h2>
            <p>{totalBookmarkedCourses}</p>
          </div>
        </div>
        {/* Box for total courses in cart */}
        <div className="statistics-box">
          <div className="box-item">
            <TiShoppingCart size={36} color="white" />
            <h2> Total Courses in Cart</h2>
            <p>{totalCoursesInCart}</p>
          </div>
        </div>
        {/* Box for total courses completed */}
        <div className="statistics-box">
          <div className="box-item">
            <TiTick size={36} color="white" />
            <h2>Total Courses Completed</h2>
            <p>{totalCoursesCompleted}</p>
          </div>
        </div>
      </div>}
      {userRole === 'Teacher' && (
        <div className="statistics-container">
          {/* Teacher statistics */}
          {/* Total courses uploaded */}
          <div className="statistics-box">
            <div className="box-item">
              <TiDocumentText size={36} color="white" />
              <h2>Total Courses Uploaded</h2>
              <p>{totalCoursesUploaded}</p>
            </div>
          </div>
          {/* Total students */}
          <div className="statistics-box">
            <div className="box-item">
              <TiUser size={36} color="white" />
              <h2>Total <br/>Students</h2>
              <p>{totalStudents}</p>
            </div>
          </div>
          {/* Total revenue from courses */}
          <div className="statistics-box">
            <div className="box-item">
              <TbReportMoney  size={36} color="white" />
              <h2>Total Revenue from Courses</h2>
              <p>Rs. {totalRevenue}</p>
            </div>
          </div>
        </div>
      )}
      <div className="user-details-container">
        <div className="profile-image-contr">
          <img src={userData.profileImage} alt="Profile" className="profile-image" />
        </div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <div className="cln-1">
        <p>
          <span className="details-label">Full Name:</span> {userData.fullName}
        </p>
        <p>
          <span className="details-label">Username:</span> {userData.username}
        </p>
        <p>
          <span className="details-label">Role:</span> {userData.role}
        </p>
        </div>
        <div className="cln-2">
        <p>
          <span className="details-label">Email:</span> {userData.email}
        </p>
        <p>
          <span className="details-label">Contact:</span>{' '}
          {userData.contact || <BsDashLg style={{ marginLeft: '1%' }} />}
        </p>
        <p>
          <span className="details-label">Address:</span>{' '}
          {userData.address || <BsDashLg style={{ marginLeft: '1%' }} />}
        </p>
        </div>
        </div>
      </div>
    </div>
  );
}

function EditDetails({ userData, updatedUserData, setUpdatedUserData, handleSubmit }) {
  const storage = getStorage();
  const [imagePreview, setImagePreview] = useState(null);
  const [isValidContact, setIsValidContact] = useState(true);
  const [isFullNameValid, setIsFullNameValid] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);  
  const [isFormValid, setIsFormValid] = useState(true);

  const fileInputRef = useRef(null);

  const handleContactChange = (e) => {
    const { value } = e.target;
    const isValidInput = /^\d{10}$/.test(value) || value === '';
    setIsValidContact(isValidInput);
    setIsFormValid(isValidInput);
    setUpdatedUserData((prevState) => ({ ...prevState, contact: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isValidInput = true;

    if (name === 'fullName') {
      isValidInput = /^[a-zA-Z\s]+$/.test(value) && value.trim().split(/\s+/).length >= 2;
      setIsFullNameValid(isValidInput);
    }

    if (name === 'email') {
      isValidInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setIsValidEmail(isValidInput);
    }
    if (name === 'address') {
      isValidInput =   /^[a-zA-Z0-9\s]+$/.test(value) ;
      isValidInput = (isValidInput && /[a-zA-Z]/.test(value) && /[0-9]/.test(value))  ||(value === '');
      setIsValidAddress(isValidInput);
    }

    setUpdatedUserData({ ...updatedUserData, [name]: value });
    setIsFormValid(isValidContact && isValidInput);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      try {
        const storageRef = ref(storage, `user_profiles/${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        setUpdatedUserData((prevState) => ({ ...prevState, profileImage: imageUrl }));
        setImagePreview(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="edit-details-container">
      {!isFormValid &&
      <p className='validation-message'> Invalid field input found</p>}
      <form onSubmit={handleSubmitForm} className="profile-form">
        <div style={{ display: 'flex' }}>
          <div className="profile-image-container">
            <div style={{ display: 'flex' }}>
              <div>
                <label htmlFor="profileImage" className="profile-image-label" onClick={handleImageClick} style={{ width: '200px' }}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile Preview" className="profile-image" />
                  ) : (
                    <img src={userData.profileImage} alt="Profile" className="profile-image" />
                  )}
                  <div className="camera-icon"><TbCameraPlus /></div>
                </label>
                <input ref={fileInputRef} type="file" accept="image/*" name="profileImage" onChange={handleImageChange} style={{ display: 'none' }} />
              </div>
              <div className="image-text">
                Profile Image size <br />
                150 x 150 pixels
              </div>
            </div>
            <label>
              <span className="label-text">Contact</span>
              <input
                type="number"
                name="contact"
                value={updatedUserData.contact || ''}
                onChange={handleContactChange}
                className={isValidContact ? 'valid' : 'invalid-input'}
              />
            </label>
          </div>

          <div className="details-left">
            <label>
              <span className="label-text">Full Name</span> <span style={{ color: 'red' }}>*</span>
              <input type="text" name="fullName" value={updatedUserData.fullName || ''} onChange={handleInputChange} className={!isFullNameValid ? 'invalid-input' : 'valid'} />
            </label>

            <label>
              <span className="label-text">Email</span> <span style={{ color: 'red' }}>*</span>
              <input
                type="email"
                name="email"
                value={updatedUserData.email || ''}
                onChange={handleInputChange}
                className={!isValidEmail ? 'invalid-input' : 'valid'}
              />
            </label>

            <label>
              <span className="label-text">Address</span>
              <input type="text" name="address" value={updatedUserData.address || ''} onChange={handleInputChange} className={!isValidAddress ? 'invalid-input' : 'valid'} />
            </label>
          </div>
        </div>

        <button type="submit" className="update-button" disabled={!isFormValid}>
          Update
        </button>
      </form>
    </div>
  );
}

function Profile() {
  const [userData, setUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [page, setPage] = useState('userDetails');
  const [totalEnrolledCourses, setTotalEnrolledCourses] = useState(0);
  const [totalBookmarkedCourses, setTotalBookmarkedCourses] = useState(0);
  const [totalCoursesInCart, setTotalCoursesInCart] = useState(0);
  const [totalCoursesCompleted, setTotalCoursesCompleted] = useState(0);
  const [totalCoursesUploaded, setTotalCoursesUploaded] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);


  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user-details/${userId}`);
        setUserData(response.data);
        setUpdatedUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const fetchStudentStatistics = async () => {
      try {
        const response = await axios.get(`/api/student-statistics/${userId}`);
        setTotalEnrolledCourses(response.data.totalEnrolledCourses);
        setTotalBookmarkedCourses(response.data.totalBookmarkedCourses);
        setTotalCoursesInCart(response.data.totalCoursesInCart);
        setTotalCoursesCompleted(response.data.totalCoursesCompleted);
      } catch (error) {
        console.error('Error fetching student statistics:', error);
      }
    };
  
    const fetchTeacherStatistics = async () => {
      try {
        const fullName = localStorage.getItem('fullName');
        const response = await axios.get(`/api/teacher-statistics/${userId}?teacherFullName=${fullName}`);
       
                setTotalCoursesUploaded(response.data.totalCoursesUploaded);
        setTotalStudents(response.data.totalStudents);
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error('Error fetching teacher statistics:', error);
      }
    };
  
    if (userRole === 'Student') {
      fetchUserData();
      fetchStudentStatistics();
    } else if (userRole === 'Teacher') {
      fetchUserData();
      fetchTeacherStatistics();
    }else{
      fetchUserData();
    }
  }, [userId, userRole]);


  const handleSubmit = async () => {
    try {
      await axios.post(`/api/update-user-details/${userId}`, updatedUserData);
      setUserData(updatedUserData);
      alert('User details updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      <nav className="profile-navigation">
        <ul>
          <li className={page === 'userDetails' ? 'active' : ''} onClick={() => setPage('userDetails')}>
            User Details
          </li>
          <li className={page === 'editDetails' ? 'active' : ''} onClick={() => setPage('editDetails')}>
            Edit Details
          </li>
        </ul>
      </nav>
      {userData && (
        <div>
          {page === 'userDetails' && 
          <UserDetails 
          userData={userData}
          totalEnrolledCourses={totalEnrolledCourses}
          totalBookmarkedCourses={totalBookmarkedCourses}
          totalCoursesInCart={totalCoursesInCart}
          totalCoursesCompleted = {totalCoursesCompleted} 
              totalCoursesUploaded={totalCoursesUploaded}
              totalStudents={totalStudents}
              totalRevenue={totalRevenue}/>}

          {page === 'editDetails' && (
            <EditDetails
              userData={userData}
              updatedUserData={updatedUserData}
              setUpdatedUserData={setUpdatedUserData}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
