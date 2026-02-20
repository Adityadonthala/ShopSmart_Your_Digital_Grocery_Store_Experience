import React, { useEffect, useState, useContext } from 'react'; // Checking context usage
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { Trash2 } from 'lucide-react';
// import CartContext from '../context/CartContext'; 

const CartPage = () => {
    // const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
    const cartItems = []; // Mock
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message>
                    Your cart is empty <Link to="/" className="underline font-bold">Go Back</Link>
                </Message>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {cartItems.map(item => (
                            <div key={item.product} className="flex items-center justify-between border-b py-4">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                    <Link to={`/product/${item.product}`} className="font-bold text-blue-600">{item.name}</Link>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span>${item.price}</span>
                                    <select
                                        value={item.qty}
                                        // onChange={(e) => addToCart(item, Number(e.target.value))}
                                        className="border rounded p-1"
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                    // onClick={() => removeFromCart(item.product)}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="border rounded-lg p-4 shadow-sm">
                            <h2 className="text-xl font-bold mb-4">
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
                            <p className="text-lg font-bold mb-4">
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </p>
                            <button
                                disabled={cartItems.length === 0}
                                onClick={() => navigate('/login?redirect=shipping')}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                            >
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage
