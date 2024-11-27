import { createBrowserRouter, redirect } from "react-router-dom";

import Login from "./pages/Login";
import ListProduct from "./pages/ListProduct";
import ProductDetail from './pages/ProductDetail';
import ProtectedRoutes from './components/ProtectedRoutes';
import Cart from './pages/Cart';
import App from './App';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/login',
                element: <Login />,
                loader: () => {
                    if (localStorage.access_token) {
                        return redirect('/')
                    }

                    return null
                }
            },
            {
                path: '',
                element: <ListProduct />
            },
            {
                path: '/product-detail',
                element: <ProductDetail />,
            },
            {
                path: '/cart',
                element: <ProtectedRoutes><Cart /></ProtectedRoutes>,
            },
        ]
    },
])

export default router