import {cart} from '../data/cart.js';
import {products} from '../data/productData.js';

let cartSummaryHtml = "";

cart.forEach((cartItem) => {
    const productID = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if(product.id === productID){
            matchingProduct = product;
            console.log(productID);
        }
    });

    cartSummaryHtml+= `
    <div class="cart-item-container ">
                <div class="delivery-date">
                    Delivery date: Friday, September 19
                </div>
                <div class="cart-item-details-grid">
                    <img
                        class="product-image"
                        src="${matchingProduct.image}"
                    >
                    <div class="cart-item-details">
                        <div class="product-name"> ${matchingProduct.name}</div>
                        <div class="product-price">$${(matchingProduct.priceCents/100).toFixed(2)}</div>
                        <div class="product-quantity">
                            <span>
                                Quantity:
                                <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link">
                                Update
                            </span>
                            <span
                                class="delete-quantity-link">
                                Delete
                            </span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        <div class="delivery-option">
                            <input
                                type="radio"
                                checked
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}"
                            >
                            <div>
                                <div class="delivery-option-date">
                                    Friday, September 19
                                </div>
                                <div class="delivery-option-price">
                                    FREE Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input
                                type="radio"
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}"
                            >
                            <div>
                                <div class="delivery-option-date">
                                    Wednesday, September 17
                                </div>
                                <div class="delivery-option-price">
                                    $4.99 - Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input
                                type="radio"
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}"
                            >
                            <div>
                                <div class="delivery-option-date">
                                    Monday, September 15
                                </div>
                                <div class="delivery-option-price">
                                    $9.99 - Shipping
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

`    
}); 

document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;