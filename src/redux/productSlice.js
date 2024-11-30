import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const initialState = {
    products: [],
    product: [],
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

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId) => {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
        const data = await response.json()
        return data
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const { id, quantity = 1 } = action.payload;
            const existingProduct = state.carts.find(product => product.id === id);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.carts.push({ ...action.payload, quantity: quantity });
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const product = state.carts.find(product => product.id === id);
            if (product) {
                product.quantity = quantity;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.product = action.payload
        })
    }
})

export const { addProduct, updateQuantity } = productSlice.actions
export default productSlice.reducer