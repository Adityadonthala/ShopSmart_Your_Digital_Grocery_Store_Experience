import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Direct API call or use a hook
import Loader from '../components/Loader';
import Message from '../components/Message';
// import CartContext from '../context/CartContext'; // To be added

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);

    // const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        // addToCart(product, Number(qty));
        navigate(`/cart/${id}?qty=${qty}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button onClick={() => navigate(-1)} className="btn btn-light mb-4 text-blue-600 hover:underline">
                Go Back
            </button>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-md" />
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold mb-4">{product.name}</h3>
                        <div className="mb-4">
                            {/* Rating */}
                            <span className="text-yellow-500 font-bold">{product.rating} ★</span> ({product.numReviews} reviews)
                        </div>
                        <p className="text-2xl font-bold mb-4">${product.price}</p>
                        <p className="text-gray-600 mb-6">{product.description}</p>

                        <div className="border p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between mb-2">
                                <span>Price:</span>
                                <span className="font-bold">${product.price}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Status:</span>
                                <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                            </div>

                            {product.countInStock > 0 && (
                                <div className="flex justify-between mb-4 items-center">
                                    <span>Qty:</span>
                                    <select
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                        className="border rounded p-1"
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <button
                                onClick={addToCartHandler}
                                className={`w-full py-2 px-4 rounded text-white font-bold ${product.countInStock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                disabled={product.countInStock === 0}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
