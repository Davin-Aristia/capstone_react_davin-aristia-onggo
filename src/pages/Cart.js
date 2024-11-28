import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // You still need to include this for the styles
import 'bootstrap-icons/font/bootstrap-icons.css';

function Cart() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [carts, setCarts] = useState([
        {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            quantity: 1,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        },
        {
            id: 2,
            title: "Mens Casual Premium Slim Fit T-Shirts",
            price: 22.3,
            quantity: 1,
            image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        },
        {
            id: 3,
            title: "Mens Cotton Jacket",
            price: 55.99,
            quantity: 1,
            image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        },
    ]);

    const handleQuantityChange = (id, value) => {
        setCarts(carts.map(cart => 
            cart.id === id ? { ...cart, quantity: Number(value) } : cart
        ));
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
