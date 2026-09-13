let productsHtml ='';

products.forEach((product)=>{
    productsHtml += `
        <div class="result-product">
            <div class="product-image-box">
                <img src="${product.image}">
            </div>
            <p class="other-colors">${product.colors}</p>
            <h2>${products.name}</h2>
            <p class="description">${product.description}</p>
            <div class="stars">
                ${products.stars}<span>${product.reviews}</span>
            </div>
            <p class="price">$${(product.priceCents/100).toFixed(2)}</p>
            <div class="quantity">
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <button class="add-cart js-cart"
            data-product-id=" ${product.id}"
            >Add to cart</button>
        </div>
    `;
});

document.querySelector('.js-product-grid2').innerHTML = productsHtml;