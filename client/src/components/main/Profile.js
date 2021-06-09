import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function Hello({ userName }) {
  return <StyledHello>{userName}님 안녕하세요!</StyledHello>;
}

const StyledFriendImage = {
  border: '1px solid black',
  borderRadius: '70%',
  width: '50%',
  margin: '10px'
};

function Profile(props) {
  console.log(props);
  return (
    <ProfileBox>
      <Hello userName={props.username} />
      <img
        src={props.profileImg}
        alt={props.username}
        style={StyledFriendImage}
      />
      <ProfileContent>
        <h3>{props.username}</h3>
      </ProfileContent>
    </ProfileBox>
  );
}

Profile.defaultProps = {
  profileImg:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2JQNgUBTWG8HjybCv26CSckhyQyol_O0tA&usqp=CAU'
};

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
  width: 100%;
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

const StyledHello = styled('div')`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
`;

export default Profile;
