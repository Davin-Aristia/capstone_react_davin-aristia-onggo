import { updateQuantity, deleteCart } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function CartItem({cart}) {
    const dispatch = useDispatch();

    const products = useSelector(state => state.products.products)

    const handleQuantityChange = (id, value) => {
        const newQuantity = Number(value);
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleDelete = (id, title) => {
        dispatch(deleteCart({ id }));
        toast.success(`${title} has been deleted from your cart!`, {
            autoClose: 3000,
        });
    };

    return (
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
            <td style={{ textAlign: "center", color: "red" }}>
                <i className="bi bi-trash-fill" onClick={() => handleDelete(cart.id, cart.title)} style={{ cursor: "pointer" }}></i>
            </td>
        </tr>
    )
}

export default CartItem;