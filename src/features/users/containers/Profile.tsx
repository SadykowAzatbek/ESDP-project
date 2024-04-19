import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';
import { ProfileMutation } from '../../../types/typeProfile';
import Warehouses from '../../warehouses/Warehouses';
import { regionsState } from '../../regions/regionsSlice';

const Profile = () => {
  const user = useAppSelector(selectUser);
  const regions = useAppSelector(regionsState);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ProfileMutation>({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    middleName: user?.middleName || '',
    region: user?.region || '',
    settlement: user?.settlement || '',
    address: user?.address || '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <Grid container spacing={2} flexWrap="nowrap">
        <Grid container direction="column" item>
          <Grid item>
            <Typography variant="h2">ХардИмя ХардФамилия</Typography>
            <Typography variant="h4">Ваш персональный код: ХардКод</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleClickOpen}>
              Редактировать профиль
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Warehouses />
        </Grid>
      </Grid>
      {/* Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Редактирование профиля</DialogTitle>
        <DialogContent
          sx={{
            mt: '20px',
          }}
        >
          <form autoComplete="off">
            {/*onsubmit */}
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12} container gap={'10px'}>
                <TextField
                  id="firstName"
                  label="Имя"
                  value={state.firstName}
                  onChange={inputChangeHandler}
                  name="firstName"
                  required
                />
                <TextField
                  id="lastName"
                  label="Фамилия"
                  value={state.lastName}
                  onChange={inputChangeHandler}
                  name="lastName"
                  required
                />

                <TextField
                  id="middleName"
                  label="Отчество"
                  value={state.middleName}
                  onChange={inputChangeHandler}
                  name="middleName"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Адрес электронной почты"
                  value={state.email}
                  onChange={inputChangeHandler}
                  name="email"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  required
                  name="region"
                  label="Регион"
                  type="text"
                  value={state.region}
                  autoComplete="new-region"
                  onChange={inputChangeHandler}
                >
                  <MenuItem value="" disabled>
                    Выберите регион
                  </MenuItem>
                  {regions.map((region) => (
                    <MenuItem key={region._id} value={region.name}>
                      {region.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="settlement"
                  label="Населенный пункт"
                  value={state.settlement}
                  onChange={inputChangeHandler}
                  name="settlement"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  label="Адрес"
                  value={state.address}
                  onChange={inputChangeHandler}
                  name="address"
                  required
                />
              </Grid>

              <Grid item xs>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Редактировать данные
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
