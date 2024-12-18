import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, fetchProductById } from '../redux/productSlice';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function ProductDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const { id } = useParams()
    const product = useSelector(state => state.products.product)
    const loading = useSelector(state => state.products.loading)

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [dispatch, id])

    const handleAddToCart = (product) => {
        if (!localStorage.getItem("access_token")){
            navigate("/login")
        } else {
            dispatch(addProduct({ ...product, quantity }))
            toast.success(`${product.title} has been added to your cart!`, {
                autoClose: 3000,
            });
        }
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center text-center align-items-center" style= {{ height: "80vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (!product) {
        return <h1 className="text-center mt-4">Product Not Found</h1>;
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