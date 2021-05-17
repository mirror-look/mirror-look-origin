//import { useState } from 'react';

import styled from 'styled-components';
//import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Logo from '../components/common/Logo';
import UserName from '../components/common/UserName';
//import Calendar from './Calendar';

function Hello({ username }) {
  return <StyledHello>{username}님 안녕하세요!</StyledHello>;
}

const StyledHello = styled('div')`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
`;

function Profile({ username }) {
  return (
    <ProfileBox>
      {/*// 이미지
			// 이름
			// 별명?
			// 이상한 숫자??
			// 나의 코디*/}
    </ProfileBox>
  );
}

const ProfileBox = styled(Box)`
  width: 364px;
  height: 380px;
  left: 131px;
  top: 216px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;
`;

function Main() {
  // api server에서 username을 받아와야함
  //  const [username, setUsername] = useState();
  const username = '김윤주';
  return (
    <MainLayout>
      <Header>
        <Logo />
        <UserName username={username} />
      </Header>
      <Body>
        <UserInfo>
          <Hello username={username} />
          <Profile />
          {/*<Wether />*/}
        </UserInfo>
        {/*<TodayOOTD></TodayOOTD>
        <Calendar></Calendar>*/}
      </Body>
    </MainLayout>
  );
}

const MainLayout = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Header = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Body = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserInfo = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Main;
