import React from 'react'
import Cookies from 'js-cookie'
import axiosInstance from '../axios'
import { useNavigate } from 'react-router-dom'
import "./checkout.css"
import { v4 as uuid } from 'uuid';

const Checkout = () => {
    const navigate = useNavigate();
    const cart = JSON.parse(localStorage.getItem('snox-cart'));
    const fname = Cookies.get('fname');
    const [checkoutCart, setcheckoutCart] = React.useState([]);

    React.useEffect(() => {
        if (cart == null || cart == undefined || cart.length == 0) {
            navigate('/')
            return;
        }
        const info = {
            "cart": cart
        }
        axiosInstance.post('/transactions/verifyCart/', info).then((res) => {
            if (res.status == 202) {
                console.log(res.data)
                setcheckoutCart(res.data)
            }
        }).catch((err) => {
            console.log(err)
        })

    }, [])


    return (
        <>
            {
                cart == null || cart == undefined ?
                    <div id="checkout-unavailable">
                        Your Cart is empty;
                        Nothing to checkout
                    </div>
                    :
                    <div id="checkout-available">

                        <table id="checkout-table">
                            <thead>
                                <tr>
                                    <td>Product Name</td>
                                    <td>SubTotal</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    checkoutCart.length != 0 ?
                                        checkoutCart.cart.map((item) => {
                                            return <tr key={uuid()} >
                                                <td>{item.name}</td>
                                                <td>₹ {item.price}</td>
                                            </tr>
                                        }) : <>
                                            Loading your cart...
                                        </>
                                }
                                {
                                    checkoutCart.length != 0 ?
                                        <tr>
                                            <td id='checkout-total-td' colSpan={2} >  Total : ₹ {checkoutCart.total} </td>
                                        </tr>
                                        : <>
                                        </>
                                }
                            </tbody>
                        </table>
                        <form action="" id="checkout-confirmation-form">
                            <h1 id="checkout-delivery-notice">Confirm Delivery Details</h1>
                            <div className="form-bifield-container">
                                <div className="form-snippet-container">
                                    <label htmlFor="fname" className="form-labels">First Name</label>
                                    <input type="text" className='form-input'  />
                                <span className="form-error-field"></span>
                                </div>
                                <div className="form-snippet-container">
                                    <label htmlFor="lname" className="form-labels">Last name: </label>
                                    <input type="text" className='form-input'/>
                                <span className="form-error-field"></span>
                                </div>
                            </div>

                            <div className="form-bifield-container">
                                <div className="form-snippet-container">
                                    <label htmlFor="email" className="form-labels">Email: </label>
                                    <input type="text" className='form-input'/>
                                <span className="form-error-field"></span>
                                </div>
                                <div className="form-snippet-container">
                                    <label htmlFor="phone" className="form-labels">Phone: </label>
                                    <input type="number" className='form-input'/>
                                <span className="form-error-field"></span>
                                </div>
                                <div className="form-snippet-container">
                                    <label htmlFor="city" className="form-labels">City: </label>
                                    <input type="text" className='form-input'/>
                                <span className="form-error-field"></span>
                                </div>
                            </div>
                            <div className="form-snippet-container">
                                <label htmlFor="street" className="form-labels">Street</label>
                                <input type="text" className='form-input'/>
                                <span className="form-error-field"></span>
                            </div>
                        </form>
                    </div>
            }
        </>
    )
}

export default Checkout