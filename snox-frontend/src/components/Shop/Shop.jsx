import React from 'react'
import "./shop.css"
import Cart from '../Assets/cart.png'
import axiosInstance from '../axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
const Shop = () => {
  const dispatch = useDispatch();

  const showCart = () => {
    dispatch({type: "showCart"});
  }

  const [products, setproducts] = useState([])


  function addToCart(name, id, price, image) {

    let cart = JSON.parse(localStorage.getItem('snox-cart')) || [];


    if (cart.length === 0) {
      const cartCreated = { "name": name, "id": id, "price": price, "image": image,
       "qty": 1 };
      cart.push(cartCreated);
      localStorage.setItem("snox-cart", JSON.stringify(cart));
    } else {
      let prodInCart = false;
      cart.forEach((el) => {
        if (el.id === id) {
          el.qty += 1;
          prodInCart = true;
        }
      });

  
      if (!prodInCart) {
        const cartCreated = { "name": name, "id": id, "price": price, "image": image, "qty": 1 };
        cart.push(cartCreated);
      }
        localStorage.setItem("snox-cart", JSON.stringify(cart));
    }
    changeItem(id);
  }


  const subtractFromCart = (name, id, price, image) => {
    let cart = JSON.parse(localStorage.getItem('snox-cart')) || [];
    if (cart.length === 0) {
      //Eat 5 star,  Do Nothing;
    } else {
      cart.forEach((el) => {
        if (el.id === id && el.qty > 0) {
          el.qty -= 1;
        }
      });
      cart = cart.filter((item)=>{
        return item.qty > 0;
      })
      localStorage.setItem("snox-cart", JSON.stringify(cart));
    }
    changeItem(id);
  }

  
  useEffect(() => {
    const getProducts = () => {
      axiosInstance.get("products/getProduct/").then((res) => {
        setproducts(res.data.products)
      }).catch((err) => {
        console.log(err)
      })
    }
    getProducts();
  }, [])


  const getQuantity = (id) => {
    let cart = JSON.parse(localStorage.getItem('snox-cart')) || [];
    let qty = 0;
    cart.forEach((item)=> {
      if(item.id == id){
        qty = item.qty;
      }

    })
    return qty;
  }

  const changeItem = (id) => {
    let item = getQuantity(id);
    let itemEL = document.getElementById('shop-item-qty-'+id);
    itemEL.innerHTML = item;
  }


  return (
    <>
      <div id="catalog">
        {
          products.map((product) => {
            return <div className="shop-product" key={product.productId} >
                <div className="shop-product-image">
                  <img src={"http://127.0.0.1:8000/v1/products"+product.image} alt="Cleanser Icon" />
                </div>
                <div className="shop-product-description">
                  <h1 className="shop-product-description-title">{product.name}</h1>
                  <h3 className="shop-product-description-subheading">{product.subname} </h3>
                  <h4 className="shop-product-description-price">₹ {product.price} /-</h4>
                  <p className="shop-product-description-desc">{product.brief}
                  </p>
                  <div className="shop-product-description-qty">
                    <div className="shop-product-description-qty-main">
                      <div className="shop-product-description-qty-symbol"
                      onClick={(e)=> {subtractFromCart(product.name, product.productId, product.price, product.image)}}
                      > -  </div>
                      <div className="shop-product-description-qty-symbol shop-product-description-center-symbol" id= {'shop-item-qty-'+product.productId} >{getQuantity(product.productId)}</div>
                      <div className="shop-product-description-qty-symbol"
                      onClick={(e) => {addToCart(product.name, product.productId, product.price, product.image)} }

                      >+</div>
                    </div>
                  </div>
                  <button className="shop-product-description-button"
                    onClick={(e) => {addToCart(product.name, product.productId, product.price, product.image); showCart()}}
                  >
                    <img src={Cart} alt="Cart"  />
                    Add To Cart </button>
                </div>
              </div>
          })
        }
        </div>
    </>
  )
}

export default Shop