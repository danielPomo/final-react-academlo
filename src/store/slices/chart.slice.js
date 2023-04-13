import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const chartSlice = createSlice({
	name: 'chart',
    initialState: [],
    reducers: {
        setChartProducts: ( state, action ) => {
            return action.payload
        }
    }
})

export const getChartThunk = () => dispatch => {


    axios
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
    .then( resp => {
        dispatch( setChartProducts(resp.data) )
        console.log(resp.data)
    } )
    .catch( error => console.log(error) )
}

export const addProductToChartThunk = (data) => dispatch => {
    axios
    .post(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, data, getConfig() )
    .then( () => dispatch( getChartThunk() ) )
    .catch( error => console.log(error) )
}

export const cartCheckoutThunk = () => dispatch => {
    axios
    .post(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases`, {} , getConfig())
    .then(() => dispatch(getChartThunk()))
    .catch(error => console.log(error))
}

export const { setChartProducts } = chartSlice.actions;

export default chartSlice.reducer;