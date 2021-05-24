import { useState } from 'react';

import styled from 'styled-components';
//import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Header from '../components/common/Header';
import NavBar from '../components/common/NavBar';
import Input from '@material-ui/core/Input';
import WindowWrapper from '../components/common/WindowWrapper';

//import Calendar from './Calendar';

function SearchUser() {
  return (
    <StyledSearchUser>
      <Input
        placeholder="Search user"
        inputProps={{ 'aria-label': 'description' }}
        style={{ width: '500px' }}
      />
    </StyledSearchUser>
  );
}

const StyledSearchUser = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 600px;
  height: 767px;

  margin: 10px;
  padding: 30px;
  background: #fce6ec;
  box-shadow: 0px 20px 100px #0057ff;
  border-radius: 30px;
`;

const StyledFriendImage = {
  border: '1px solid black',
  borderRadius: '70%',
  width: '100px',
  margin: '10px'
};

function FriendImage(username) {
  return (
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2JQNgUBTWG8HjybCv26CSckhyQyol_O0tA&usqp=CAU"
      alt={username}
      style={StyledFriendImage}
    />
  );
}

function Friend() {
  const username = '하성민';
  const nickname = '꼬부기';
  const date = '3일전';
  return (
    <StyledFriend>
      <FriendImage username={username} />
      <StyledFriendInfo>
        <h3>{username}</h3>
        <h4>{nickname}</h4>
      </StyledFriendInfo>
      <p>마지막 OOTD : {date}</p>
    </StyledFriend>
  );
}

const StyledFriend = styled(Box)`
  width: 529.77px;
  height: 123.48px;
  margin: 10px;

  background: rgba(226, 226, 226, 0.3);
  border: 1px solid #e1e7fc;
  border-radius: 30px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 15px;
  text-align: end;
`;

const StyledFriendInfo = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Friends() {
  // 여기서 backend api 요청하여 친구 목록 불러옴
  return (
    <StyledFriends>
      <Friend />
      <Friend />
      <Friend />
      <Friend />
    </StyledFriends>
  );
}

const StyledFriends = styled(Box)`
  background: linear-gradient(15.95deg, #f1f8fe 15.52%, #ecf6ff 70.25%);
  box-shadow: 9px 4px 50px rgba(0, 0, 0, 0.05);
  border-radius: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 10px;
  padding: 30px;
  width: 600px;
  height: 767px;
`;

function FriendsList() {
  // api server에서 username을 받아와야함
  //  const [username, setUsername] = useState();
  const username = '김윤주';
  return (
    <WindowWrapper>
      <NavBar />
      <MainLayout>
        <Header username={username} />
        <Body>
          <SearchUser />
          <Friends />
        </Body>
      </MainLayout>
    </WindowWrapper>
  );
}

const MainLayout = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Body = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default FriendsList;
