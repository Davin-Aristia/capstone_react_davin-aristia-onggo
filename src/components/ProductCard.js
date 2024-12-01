import { useNavigate, Link } from 'react-router-dom';
import { addProduct } from '../redux/productSlice';
import { useDispatch } from 'react-redux';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        <div style={{width: "20%"}} className="p-3">
            <div className="card">
                <img src={product.image} className="card-img-top square-image" alt={product.title} />
                <div className="card-body">
                    <h4 className="card-text">{product.title}</h4>
                    <span className="badge bg-dark mt-4">{product.category}</span>
                    <p className="card-text my-3">{truncateDescription(product.description, 10)}</p>
                    <Link to={`/product-detail/${product.id}`} className="btn btn-primary me-2">Detail</Link>
                    <span onClick={() => handleAddToCart(product)} className="btn btn-success">Add to Cart</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;