import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { useEffect } from 'react';

import ProductCard from '../components/ProductCard';

function ListProduct() {
    const dispatch = useDispatch();

    const products = useSelector(state => state.products.products)
    const loading = useSelector(state => state.products.loading)
    
    useEffect(() => {
        if (!products || !products.length){
            dispatch(fetchProducts())
        }
    }, [dispatch, products])

    return (
        <div style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
            <h1 className="my-3">Products</h1>
            <hr/>

            {loading ? (
                <div
                    className="d-flex justify-content-center text-center align-items-center"
                    style={{ height: "80vh" }}
                >
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : !products ? (
                <h1 className="text-center mt-4">Product Not Found</h1>
            ) : (
                <div className="row">
                {
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
                </div>
            )}
        </div>
    )
}

export default ListProduct