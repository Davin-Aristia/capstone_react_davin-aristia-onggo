import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { updateQuantity } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';  // You still need to include this for the styles
import 'bootstrap-icons/font/bootstrap-icons.css';

function Cart() {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const carts = useSelector(state => state.products.carts)

    const handleQuantityChange = (id, value) => {
        const newQuantity = Number(value);
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };
    


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch Modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> <i className="bi bi-cart-fill" style={{ marginRight: '8px' }}></i> My Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table mb-5">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                carts.map((cart) => (
                                    <tr>
                                        <td>
                                            <img src={cart.image} className="me-3" style={{ width: "2rem", height: "2rem" }} alt={cart.title} />
                                            {cart.title}
                                        </td>
                                        <td>${cart.price.toFixed(2)}</td>
                                        <td>
                                            <input 
                                                type="number"
                                                className="form-control"
                                                style={{ width: "4rem", marginRight: "0.5rem" }}
                                                value={cart.quantity}
                                                min="1"
                                                onChange={(e) => handleQuantityChange(cart.id, e.target.value)}
                                            />
                                        </td>
                                        <td>${(cart.price * cart.quantity).toFixed(2)}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td style={{ fontWeight: "bold" }} colspan="3">Total</td>
                                <td style={{ fontWeight: "bold" }}>${carts.reduce((total, cart) => total + cart.price * cart.quantity, 0).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Checkout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Cart;
