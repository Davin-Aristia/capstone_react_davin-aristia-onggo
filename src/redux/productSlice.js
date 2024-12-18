import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const initialState = {
    products: [],
    product: {},
    carts: [],
    loading: false,
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
    name: ' ',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const { id, quantity = 1 } = action.payload;
            const existingProduct = state.carts.find(product => product.id === id);

            if (existingProduct) {
                existingProduct.quantity += Number(quantity);
            } else {
                state.carts.push({ ...action.payload, quantity: Number(quantity) });
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const product = state.carts.find(product => product.id === id);
            if (product) {
                product.quantity = quantity;
            }
        },
        deleteCart: (state, action) => {
            const { id } = action.payload;
            state.carts = state.carts.filter(product => product.id !== id);
        },
        checkout: (state) => {
            state.carts.forEach(cart => {
                const product = state.products.find(p => p.id === cart.id);
                if (product && product.stock >= cart.quantity) {
                    product.stock -= cart.quantity;
                }
            });
            state.carts = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.products = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.map(product => ({ ...product, stock: 20, }))
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
                state.products = null
            })
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.product = {}
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload
            })
            .addCase(fetchProductById.rejected, (state) => {
                state.loading = false;
                state.product = null
            })
    }
})

export const { clearProduct, addProduct, updateQuantity, deleteCart, checkout } = productSlice.actions
export default productSlice.reducer