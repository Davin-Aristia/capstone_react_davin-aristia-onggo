import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { useEffect } from 'react';

import ProductCard from '../components/ProductCard';

function ListProduct() {
    const dispatch = useDispatch();

    const products = useSelector(state => state.products.products)
    
    useEffect(() => {
        if (!products.length){
            dispatch(fetchProducts())
        }
    }, [dispatch, products.length])

    return (
        <div style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
            <h1 className="my-3">Products</h1>

            <hr/>
            <div className="row">
            {
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
            </div>
        </div>
    )
}

export default ListProduct