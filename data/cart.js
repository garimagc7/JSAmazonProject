export const cart = [{
    productId: "P001",
    quantity: 1,
}, {
    productId: "P004",
    quantity: 1,
}
];

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
}
