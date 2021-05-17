//import { useState } from 'react';

import styled from 'styled-components';
//import Button from '@material-ui/core/Button';
//import Box from '@material-ui/core/Box';
import Logo from '../components/common/Logo';
import UserName from '../components/common/UserName';
//import Calendar from './Calendar';

//function UserInfo() {}

function Main() {
  // api server에서 username을 받아와야함
  //  const [username, setUsername] = useState();
  const username = '임채욱';
  return (
    <MainLayout>
      <Header>
        <Logo />
        <UserName username={username} />
      </Header>
      {/*<Body>
        <UserInfo>
          <Hello />
          <Profile />
          <Wether />
        </UserInfo>
        <TodayOOTD></TodayOOTD>
        <Calendar></Calendar>
      </Body>*/}
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

//const Body = styled('div')`
//  display: flex;
//  flex-direction: row;
//  justify-content: center;
//  align-items: center;
//`;

//const UserInfo = styled('div')`
//  display: flex;
//  flex-direction: column;
//  justify-content: center;
//  align-items: center;
//`;

export default Main;
