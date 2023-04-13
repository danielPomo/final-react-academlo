import { configureStore } from '@reduxjs/toolkit'
import products from "./slices/products.slice"
import chart from './slices/chart.slice'


export default configureStore({
  reducer: {
    products: products,
    chart: chart
	}
})
