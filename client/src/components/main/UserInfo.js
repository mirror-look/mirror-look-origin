import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Weather from './Weather';

function Hello({ userName }) {
  return <StyledHello>{userName}님 안녕하세요!</StyledHello>;
}

const StyledFriendImage = {
  border: '1px solid black',
  borderRadius: '70%',
  width: '50%',
  margin: '10px'
};

function UserInfo({ userName, profileImg, lat, lng }) {
  return (
    <StyledUserInfo>
      <ProfileBox>
        {/*<Hello userName={userName} />*/}
        <img src={profileImg} alt={userName} style={StyledFriendImage} />
        <ProfileContent>
          <h3>{userName}</h3>
        </ProfileContent>
        {!!lat && !!lng ? <Weather lat={lat} lng={lng} /> : ''}
      </ProfileBox>
    </StyledUserInfo>
  );
}

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
  height: 100%;

  background: #ffffff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHello = styled('div')`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 40px;
`;

const StyledUserInfo = styled.div`
  /*min-width: 300px;*/
  flex-grow: 1;
  width: 100%;
  height: 100%;
  margin: 0 15px;
`;

export default UserInfo;
