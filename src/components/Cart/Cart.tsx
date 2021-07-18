import React from 'react';
import { CartItemType } from '../../App';
import CartItem from '../CartItem/CartItem';
//Styles
import { Wrapper } from './Cart.styles'

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((acc: number, item) => acc + item.price * item.amount, 0);


    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {
                cartItems.length === 0 ? <p>No items in cart.</p> : null
            }
            {
                cartItems.map(item =>
                    <CartItem
                        key={item.id}
                        item={item}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    ></CartItem>
                )
            }
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    );
};

export default Cart;