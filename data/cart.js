export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart =[{
    productId: "P001",
    quantity: 1,
}, {
    productId: "P004",
    quantity: 1,
}];
}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,quantity){

  let matchingItem;

    cart.forEach((item) => {
    if (productId === item.productId) {
        matchingItem = item;
    }
    });

    if (matchingItem) {
    matchingItem.quantity += quantity;
    } else {
    cart.push({
        productId: productId,
        quantity: quantity
    });
    }
    saveToStorage();
}

export function removeFromCart(productId) {

    const index = cart.findIndex((cartItem) => {
        return cartItem.productId === productId;
    });

    if (index !== -1) {
        cart.splice(index, 1);
    }
    saveToStorage();
}