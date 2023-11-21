import React from 'react'
import "./Cart.css"
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const closeCart = () => {
        dispatch({type: "hideCart"})
    }
    let cart = JSON.parse(localStorage.getItem('snox-cart'));
    const showCart = useSelector((state) => {
        return state.cartReducer.showCart;
    })

    let total = 0;
    if(cart != null || cart != undefined){
        cart.forEach(item => {
            total += item.price * item.qty;
        });
    }

    return (
        showCart ? <div id="cart-container">
            <OutsideClickHandler onOutsideClick={(e) => {closeCart()}} >

            <div id="cart">
                <h1 id="cart-cross"><span id="cart-cross-icon" onClick={(e)=> {closeCart()}} >X</span> </h1>
                <div id="cart-content">
                    {
                        cart != null || cart != undefined ?
                        cart.map((item) => {
                            return <div className="cart-item" key={item.id} >
                                <div className="cart-item-image">
                                    <img src= {"http://127.0.0.1:8000/v1/products"+ item.image} alt= "Item Image" />
                                </div>
                                <div className="cart-item-details">
                            <h2 className="cart-item-name">{item.name}</h2>
                            <h3 className="cart-item-price"> Price: ₹ {item.price} per unit </h3>
                            <h4 className="cart-item-qt">Quantity: {item.qty} </h4>
                            <p className="cart-item-subtotal">Subtotal: ₹ {item.price * item.qty} /- </p>
                                </div>
                            </div>
                        })
                        : <></>
                    }
                </div>
                {
                    cart == null || cart == undefined  || cart.length == 0?
                    <>
                    <h1 id="cart-empty">Your Snox Retail cart is empty.</h1>
                    </>
                    :
                    <div className="cart-total">
                        <h1>Total: ₹ {total} </h1>
                        <button className='cart-checkout'>CheckOut</button>
                    </div>
                    }
            </div>
                    </OutsideClickHandler>
        </div> : <>
        </>
    )
}

export default Cart