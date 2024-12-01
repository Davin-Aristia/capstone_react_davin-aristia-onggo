import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, fetchProductById } from '../redux/productSlice';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

function ProductDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const { id } = useParams()
    const product = useSelector(state => state.products.product)

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [])

    const handleAddToCart = (product) => {
        if (!localStorage.getItem("access_token")){
            navigate("/login")
        } else {
            dispatch(addProduct({ ...product, quantity }))
        }
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <img src={product.image} className="img-fluid" style={{ maxHeight: "90vh", objectFit: "cover" }} 
 alt={product.title} />
            </div>
            <div className="col-md-8">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mt-4 mb-4" style={{ fontSize: "1.2rem" }}>
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{product.category}</li>
                    </ol>
                </nav>
                <h1 style={{ fontSize: "4rem" }}>{product.title}</h1>
                <h1 className="mt-5">${product.price}</h1>
                <div className="d-flex align-items-center mt-5">
                <input 
                    type="number" 
                    className="form-control"
                    name="modal-name"
                    value={quantity}
                    min="1"
                    onChange={(event) => setQuantity(event.target.value)}
                    style={{ width: "4rem", border: "1px solid red", marginRight: "0.5rem" }}
                />
                <button className="btn btn-danger rounded-pill" onClick={() => handleAddToCart(product)}>
                    Add To Cart
                </button>
                </div>
                <h1 className="mt-5">Product Details</h1>
                <hr/>
                <p style={{ fontSize: "1.2rem" }}>{product.description}</p>
            </div>
        </div>
    )
}

export default ProductDetail