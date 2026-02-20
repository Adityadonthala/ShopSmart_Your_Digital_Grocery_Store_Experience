import { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case 'CART_REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };
        case 'CART_CLEAR_ITEMS':
            return {
                ...state,
                cartItems: []
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    const addToCart = (product, qty) => {
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty,
            },
        });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: id });
    };

    const clearCart = () => {
        dispatch({ type: 'CART_CLEAR_ITEMS' });
    }

    return (
        <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
