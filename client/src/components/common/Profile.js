import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const StyledFriendImage = {
  border: '1px solid black',
  borderRadius: '70%',
  width: '100px',
  margin: '10px'
};

function Profile({ username }) {
  return (
    <ProfileBox>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2JQNgUBTWG8HjybCv26CSckhyQyol_O0tA&usqp=CAU"
        alt={username}
        style={StyledFriendImage}
      />
      <ProfileContent>
        <h3>{username}</h3>
        <p className="nickname">꼬부기</p>
        <PostCount count={23}></PostCount>
        <p>나의 게시물</p>
      </ProfileContent>
      {/*// 이미지 ..아마 path로 받을듯?
			  // 이름
			  // 별명?
			  // 이상한 숫자??
			  // 나의 코디*/}
    </ProfileBox>
  );
}

function PostCount({ count }) {
  return <StyledUserName>{count}</StyledUserName>;
}

const StyledUserName = styled(Button)`
  font-size: 15px;
  font-weight: bold;
  margin-top: 20px;
`;

const ProfileContent = styled(Box)`
  margin: 15px;
  text-align: center;
  .nickname {
    color: grey;
  }
  p {
    margin: 0;
  }
`;

const ProfileBox = styled(Box)`
  width: 364px;
  height: 380px;
  left: 131px;
  top: 216px;

  background: #ffffff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;
  margin: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Profile;
