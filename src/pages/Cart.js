// import { Button } from 'react-bootstrap';
import { checkout } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import CartItem from '../components/CartItem';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const carts = useSelector(state => state.products.carts)
    
    const handleCheckout = () => {
        dispatch(checkout());
        toast.success(`Checkout successful!`, {
            autoClose: 3000,
        });
        navigate("/");
    };

    return (
        <div style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
            <h1 className="my-3">
                <i className="bi bi-cart-fill" style={{ marginRight: '8px' }}></i>
                My Cart
            </h1>
            <hr/>

            {
                carts.length > 0 ? (
                    <div>
                        <table className="table mb-5 mt-4">
                            <thead>
                                <tr style={{ fontSize: "1.5rem" }}>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col" style={{ textAlign: "center" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    carts.map((cart) => (
                                        <CartItem key={cart.id} cart={cart} />
                                    ))
                                }
                                <tr style={{ fontSize: "1.5rem" }}>
                                    <td style={{ fontWeight: "bold" }} colSpan="3">Total</td>
                                    <td style={{ fontWeight: "bold" }}>${carts.reduce((total, cart) => total + cart.price * cart.quantity, 0).toFixed(2)}</td>
                                    <td />
                                </tr>
                            </tbody>
                        </table>

                        <span className="btn btn-primary" onClick={handleCheckout} style={{ float: "right" }}>
                            Checkout
                        </span>
                    </div>
                ) : (
                    <h1 className="text-center mt-4">Anda belum memilih item</h1>
                )
            }
            
        </div>
    );
}

export default Cart;
