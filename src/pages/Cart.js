import { Button } from 'react-bootstrap';
import { updateQuantity, checkout } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const products = useSelector(state => state.products.products)
    const carts = useSelector(state => state.products.carts)

    const handleQuantityChange = (id, value) => {
        const newQuantity = Number(value);
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };
    
    const handleCheckout = () => {
        dispatch(checkout());
        navigate("/")
    };

    return (
        <div style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
            <h1 className="my-3">
                <i className="bi bi-cart-fill" style={{ marginRight: '8px' }}></i>
                My Cart
            </h1>
            <hr/>

            <table className="table mb-5 mt-4">
                <thead>
                    <tr style={{ fontSize: "1.5rem" }}>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carts.map((cart) => (
                            <tr style={{ fontSize: "1.2rem" }}>
                                <td style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src={cart.image} className="me-3" style={{ width: "3rem", height: "3rem" }} alt={cart.title} />
                                        <span>{cart.title}</span>
                                    </div>
                                    {
                                        products.find(product => product.id === cart.id)?.stock < cart.quantity && 
                                        <p className="text-danger" style={{ marginLeft: "3rem", marginBottom: 0, fontWeight: "bold"}}>Quantity tidak terpenuhi</p>
                                    }
                                </td>
                                <td>${cart.price.toFixed(2)}</td>
                                <td>
                                    <input 
                                        type="number"
                                        className="form-control"
                                        style={{ width: "6rem", marginRight: "0.5rem" }}
                                        value={cart.quantity}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(cart.id, e.target.value)}
                                    />
                                </td>
                                <td>${(cart.price * cart.quantity).toFixed(2)}</td>
                            </tr>
                        ))
                    }
                    <tr style={{ fontSize: "1.5rem" }}>
                        <td style={{ fontWeight: "bold" }} colspan="3">Total</td>
                        <td style={{ fontWeight: "bold" }}>${carts.reduce((total, cart) => total + cart.price * cart.quantity, 0).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <Button variant="primary" onClick={handleCheckout}>
                Checkout
            </Button>
        </div>
    );
}

export default Cart;
