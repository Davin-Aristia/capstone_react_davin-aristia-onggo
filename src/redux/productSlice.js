import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const initialState = {
    products: [],
    carts: [],

}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        return data
    }
)

// const fetchUserById = createAsyncThunk(
//     'users/fetchUserById',
//     async (userId) => {
//         // dispatch(fetchUserById(1))
//         const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//         const data = await response.json()
//         return data
//     }
// )

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            // dispatch(addUser({name: 'John Doe'}))
            // action.payload => {name: 'John Doe'}
            // action.type => users/addUser
            state.carts.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
    }
})

export const { addProduct } = productSlice.actions
export default productSlice.reducer