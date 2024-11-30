import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, fetchProducts } from '../redux/productSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function ListProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector(state => state.products.products)
    

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const truncateDescription = (text, maxWords) => {
        const words = text.split(" ");
        return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
    };

    const handleAddToCart = (product) => {
        if (!localStorage.getItem("access_token")){
            navigate("/login")
        } else {
            dispatch(addProduct(product))
        }
    }

    return (
        <div style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
            <h1 className="my-3">Products</h1>

            <hr/>
            <div className="row">
            {
                products.map((product) => (
                    <div style={{width: "20%"}} className="p-3" key={product.id}>
                        <div className="card">
                            <img src={product.image} className="card-img-top square-image" alt={product.title} />
                            <div className="card-body">
                                <h4 className="card-text">{product.title}</h4>
                                <span className="badge bg-dark mt-4">{product.category}</span>
                                <p className="card-text my-3">{truncateDescription(product.description, 10)}</p>
                                <a href={`/product-detail/${product.id}`} className="btn btn-primary me-2">Detail</a>
                                <span onClick={() => handleAddToCart(product)} className="btn btn-success">Add to Cart</span>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default ListProduct