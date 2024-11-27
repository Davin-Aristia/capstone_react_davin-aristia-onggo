import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductDetail() {
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1);

    const { id } = useParams()

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
          .then(result => {
            const data = {
                  id: result.data.id,
                  title: result.data.title,
                  category: result.data.category,
                  image: result.data.image,
                  description: result.data.description,
                  price: result.data.price,
                };
            setProduct(data);
          })
          .catch((error) => {
            console.error("Error fetching product:", error);
            setProduct([]);
          });
    }, [id])

    return (
        <div class="row">
            <div class="col-md-4">
                <img src={product.image} className="img-fluid" style={{ maxHeight: "90vh", objectFit: "cover" }} 
 alt={product.title} />
            </div>
            <div class="col-md-8">
                <h1 style={{ fontSize: "4rem" }}>{product.title}</h1>
                <h1 className="mt-5">${product.price}</h1>
                <div className="d-flex align-items-center mt-5">
                <input 
                    type="number" 
                    className="form-control"
                    name="modal-name"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    style={{ width: "4rem", border: "1px solid red", marginRight: "0.5rem" }}
                />
                <button className="btn btn-danger rounded-pill">
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