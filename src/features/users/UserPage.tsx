import { Grid, useMediaQuery } from '@mui/material';
import UserNavigation from './components/UserNavigation';
import {Outlet, useNavigate} from 'react-router-dom';
import {selectUser} from './usersSlice';
import {useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {appRoutes} from '../../utils/constants';


const UserPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(appRoutes.register);
    }
    if (
      user?.role === 'super' ||
      user?.role === 'admin' ||
      user?.role === 'manager'
    ) {
      navigate(appRoutes.statistics);
    } else {
      navigate(appRoutes.information);
    }
  }, [navigate, user]);
  return (
    <>
      <Grid container direction={isSmallScreen ? 'column' : 'row'}>
        <Grid item xs={3} pr={2}>
          <UserNavigation />
        </Grid>
        <Grid item xs={9} px={3} pt={2}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default UserPage;
