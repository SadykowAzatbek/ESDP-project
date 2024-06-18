import { createSlice } from '@reduxjs/toolkit';
import { ShipmentData, ShipmentsResponse } from '../../types/types.Shipments';
import { createShipment, fetchShipments, fetchShipmentsByQuery, fetchShipmentsByUser } from './shipmentsThunk';
import { RootState } from '../../app/store';
import { toast } from 'react-toastify';

interface shipmentsState {
  shipments: ShipmentData[];
  shipmentsLoading: boolean;
  shipmentsError: boolean;
  addShipment: ShipmentsResponse | null;
  addShipmentLoading: boolean;
  addShipmentError: boolean;
}

const initialState: shipmentsState = {
  shipments: [],
  shipmentsLoading: false,
  shipmentsError: false,
  addShipment: null,
  addShipmentLoading: false,
  addShipmentError: false,
};

export const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.shipmentsLoading = true;
      })
      .addCase(fetchShipments.fulfilled, (state, { payload }) => {
        state.shipmentsLoading = false;
        state.shipments = payload.shipments;
      })
      .addCase(fetchShipments.rejected, (state) => {
        state.shipmentsLoading = false;
        state.shipmentsError = true;
      });
    
    builder
      .addCase(createShipment.pending, (state) => {
        state.addShipmentLoading = true;
        state.addShipmentError = false;
      })
      .addCase(createShipment.fulfilled, (state, { payload: data }) => {
        state.addShipmentLoading = false;
        state.addShipment = data;
        if (data.message) {
          toast.success(data.message);
        }
      })
      .addCase(createShipment.rejected, (state) => {
        state.addShipmentLoading = false;
        state.addShipmentError = true;
      });
    
    builder
      .addCase(fetchShipmentsByUser.pending, (state) => {
        state.shipmentsLoading = true;
      })
      .addCase(fetchShipmentsByUser.fulfilled, (state, { payload }) => {
        state.shipments = payload.shipments;
        state.shipmentsLoading = false;
      })
      .addCase(fetchShipmentsByUser.rejected, (state) => {
        state.shipmentsLoading = false;
        state.shipmentsError = true;
      });
    
    builder
      .addCase(fetchShipmentsByQuery.pending, (state) => {
        state.shipmentsLoading = true;
      })
      .addCase(fetchShipmentsByQuery.fulfilled, (state, { payload }) => {
        state.shipments = payload.shipments;
        state.shipmentsLoading = false;
      })
      .addCase(fetchShipmentsByQuery.rejected, (state) => {
        state.shipmentsLoading = false;
        state.shipmentsError = true;
      });
  },
});

export const shipmentsReducer = shipmentsSlice.reducer;
export const selectShipments = (state: RootState) => state.shipments.shipments;
export const selectShipmentsLoading = (state: RootState) =>
  state.shipments.shipmentsLoading;

export const addShipmentGetLoad = (state: RootState) =>
  state.shipments.addShipmentLoading;
export const addShipmentGetError = (state: RootState) =>
  state.shipments.addShipmentError;
