import {
  // Box,
  Button, IconButton,
  // Modal,
  TableCell,
  TableRow,
  // Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  useAppDispatch,
  // useAppSelector
} from '../../../app/hooks';
import {
  // selectOrdersCancelLoading,
  toggleModal,
} from '../ordersSlice';
import { FC, useState } from 'react';
import { Shipment } from '../../../types/types.Shipments';
import WarningModal from './WarningModal';


const OrdersRowItem: FC<Shipment> = ({
  _id,
  pupId,
  price,
  trackerNumber,
  status,
  delivery,
}) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState(false);
  const [color, setColor] = useState(false);

  const openWarningModalWindow = () => {
    setState(true);
  };

  const closeWarningModalWindow = () => {
    setState(false);
  };

  const changeColorField = () => {
    setColor(true);
    setState(false);
  };

  const showModal = () => {
    dispatch(toggleModal({ toggle: true, id: { _id } }));
  };

  return (
    <>
      <WarningModal
        changeColor={changeColorField}
        closeModal={closeWarningModalWindow}
        stateModal={state} />
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {trackerNumber}
        </TableCell>
        <TableCell align="left">{pupId.address}</TableCell>
        <TableCell align="left">{price.som} СОМ</TableCell>
        <TableCell align="left">{status}</TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={showModal}
            disabled={color}>
            {delivery.status ? 'Отменить доставку' : (color ? 'Отмена' : 'Доставка')}
          </Button>
        </TableCell>
        <TableCell align="center">
          <LoadingButton
            sx={{ minWidth: '29px', padding: '3px', borderRadius: '50%' }}
            onClick={openWarningModalWindow}
            color="error">
            <IconButton sx={{ color: 'inherit' }}>
              <CancelIcon />
            </IconButton>
          </LoadingButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrdersRowItem;
