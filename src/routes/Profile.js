/* Profile.js */
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React from 'react';
import { useState } from 'react';
import { BsGear } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { FaArrowAltCircleLeft, FaCheck, FaPencilAlt, FaUserEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { authService, storage } from '../api/fbase';
import '../styles/Profile.css';

function Profile({ userObj }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(true);
  const [userImage, setUserImage] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');

  // console.log(userObj);

  /* onLogOutClick */
  /* 로그아웃 클릭 시 로그아웃 후 홈으로 다이렉트 */
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };

  /* onUserImgChange */
  /* user이미지 업데이트 */
  const onUserImgChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setUserImage(result);
    };
    reader.readAsDataURL(theFile);
  };

  /* onSubmitImg */
  const onSubmit = async () => {
    let userImageUrl = '';
    if (userImage !== '') {
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, userImage, 'data_url');
      userImageUrl = await getDownloadURL(ref(storage, response.ref));
      // console.log(response);
    }
    await updateProfile(authService.currentUser, {
      photoURL: userImageUrl,
    });
    setUserImage('');
  };

  /* onClearUserImage */
  /* 첨부 파일 삭제 */
  const onClearUserImage = () => {
    setUserImage('');
  };

  /* onChange */
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  /* onEditDisplayName */
  /* 새로운 이름 업데이트 */
  const onEditDisplayName = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
    }
    onEditToggle();
  };

  /* onEditToggle */
  /* Edit 버튼 토글기능 */
  const onEditToggle = () => {
    setEditing((prev) => !prev);
  };
  return (
    <>
      <Link to='/'>
        <FaArrowAltCircleLeft className='profile__back' />
      </Link>
      <span className='profile__title'>내 프로필</span>
      <span className='profile__setting'>
        <BsGear />
      </span>
      <div className='profile'>
        <div className='profile__img empty'>
          <img src={userImage ? userImage : userObj.photoURL} alt='' />
          <label htmlFor='changeUserImg'>
            <FaUserEdit className='edit' />
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={onUserImgChange}
            className='blind'
            id='changeUserImg'
          />

          {userImage && (
            <>
              <span onClick={onSubmit} className='confirm'>
                OK
              </span>
              <span onClick={onClearUserImage} className='cancel'>
                Cancel
              </span>
            </>
          )}
        </div>
        <span className='profile__name'>
          {editing ? (
            userObj.displayName ? (
              `${userObj.displayName}`
            ) : (
              'User'
            )
          ) : (
            <span className='name-box'>
              <input
                type='text'
                placeholder={userObj.displayName}
                onChange={onChange}
                value={newDisplayName}
                autoFocus
                maxLength='15'
                className='profile__name-input'
              />
              <FaCheck
                onClick={onEditDisplayName}
                icon='fa-solid fa-check'
                className='editName-icon check'
              />
              <CgClose
                onClick={onEditToggle}
                icon='fa-solid fa-xmark'
                className='editName-icon xmark'
              />
            </span>
          )}
          {editing ? (
            <span onClick={onEditToggle} className='editName'>
              <FaPencilAlt className='editName' />
            </span>
          ) : (
            ''
          )}
        </span>
        <div onClick={onLogOutClick} className='profile__logout'>
          로그아웃
        </div>
      </div>
    </>
  );
}

export default Profile;
