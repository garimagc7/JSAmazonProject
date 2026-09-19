import {cart, removeFromCart} from '../data/cart.js';
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
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date js-delivery-date">
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
                                class="delete-quantity-link js-delete-link"
                                data-product-id="${matchingProduct.id}">
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
                                data-shipping-cost="0"
                                data-delivery-option="friday"
                                data-delivery-date="Friday, September 19"
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
                                data-shipping-cost="4.99"
                                data-delivery-option="Wednesday"
                                data-delivery-date="Wednesday, September 17"
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
                                data-shipping-cost="9.99"
                                data-delivery-option="Monday"
                                data-delivery-date="Monday, September 15"
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

document.querySelectorAll('.delivery-option-input')
    .forEach((radio) => {

        const productId =
            radio.name.replace('delivery-option-', '');

        const savedOption =
            localStorage.getItem(`delivery-option-${productId}`);

        if(savedOption === radio.dataset.deliveryOption) {
            radio.checked = true;
            const container = radio.closest('.cart-item-container');

           container.querySelector('.js-delivery-date').innerHTML =
                `Delivery date: ${radio.dataset.deliveryDate}`;
        }
});

function updateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-item-count').innerHTML = cartQuantity;
  document.querySelector(".js-checkout-item-count").innerHTML = cartQuantity;
}
updateCartQuantity();

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {

            const productId = link.dataset.productId;

            removeFromCart(productId);

            const container = link.closest('.cart-item-container');

            container.remove();
            updateCartQuantity();
            updateOrderSummary();
        });
    });

function updateOrderSummary() {

    let cartQuantity = 0;
    let itemsTotalCents = 0;
    let shippingTotalCents = 0;

    cart.forEach((cartItem) => {

        cartQuantity += cartItem.quantity;

        products.forEach((product) => {

            if(product.id === cartItem.productId) {
                itemsTotalCents +=
                    product.priceCents * cartItem.quantity;
            }
        });
    });
    
    document.querySelectorAll('.delivery-option-input')
    .forEach((radio) => {
        if(radio.checked) {
            shippingTotalCents +=
                Number(radio.dataset.shippingCost) * 100;
        }
    });

    const totalBeforeTaxCents = itemsTotalCents + shippingTotalCents;

    const taxCents = totalBeforeTaxCents * 0.10;

    const orderTotalCents = totalBeforeTaxCents + taxCents;

    document.querySelector('.js-item-count').innerHTML = cartQuantity;

    document.querySelector('.js-items-total').innerHTML =`$${(itemsTotalCents / 100).toFixed(2)}`;

    document.querySelector('.js-shipping-total').innerHTML = `$${(shippingTotalCents / 100).toFixed(2)}`;

    document.querySelector('.js-total-before-tax').innerHTML = `$${(totalBeforeTaxCents / 100).toFixed(2)}`;

    document.querySelector('.js-tax').innerHTML = `$${(taxCents / 100).toFixed(2)}`;

    document.querySelector('.js-order-total').innerHTML = `$${(orderTotalCents / 100).toFixed(2)}`;
}

document.querySelectorAll('.delivery-option-input')
    .forEach((radio) => {

        radio.addEventListener('change', () => {

            const productId = radio.name.replace('delivery-option-', '');

            localStorage.setItem(
                `delivery-option-${productId}`,
                radio.dataset.deliveryOption
            );

            const container = radio.closest('.cart-item-container');

            container.querySelector('.js-delivery-date').innerHTML =
                `Delivery date: ${radio.dataset.deliveryDate}`;

            updateOrderSummary();
        });

 });

updateOrderSummary();