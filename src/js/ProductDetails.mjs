import ProductData from './ProductData.mjs';

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function displayProductDetails(product) {
    if (!product) {
        document.title = 'Sleep Outside | Product not found';
        document.querySelector('section.product-detail > h3').textContent = 'Brand not available';
        document.querySelector('section.product-detail > h2').textContent = 'Unnamed Product';
        const imageElement = document.querySelector('section.product-detail > img');
        imageElement.src = '#';
        imageElement.alt = 'Unnamed Product';
        document.querySelector('.product-card__price').textContent = '$0.00';
        document.querySelector('.product__color').textContent = 'No color available';
        document.querySelector('.product__description').textContent = 'No description available';
        document.querySelector('#addToCart').setAttribute('No ID available');
        return;
    }

    // Llenar los campos con datos reales del producto
    document.title = `Sleep Outside | ${product.Name}` || 'Unnamed Product';
    document.querySelector('section.product-detail > h3').textContent = product.Brand.Name || 'Brand not available';
    document.querySelector('section.product-detail > h2').textContent = product.NameWithoutBrand || 'Unnamed Product';
    const imageElement = document.querySelector('section.product-detail > img');
    imageElement.src = product.Image || 'default-image.jpg';
    imageElement.alt = product.NameWithoutBrand || 'Unnamed Product';
    document.querySelector('.product-card__price').textContent = `$${product.ListPrice}` || '$0.00';
    document.querySelector('.product__color').textContent = product.Colors?.[0]?.ColorName || 'No color available';
    document.querySelector('.product__description').innerHTML  = product.DescriptionHtmlSimple || 'No description available';
    document.querySelector('#addToCart').setAttribute('data-id', product.Id || 'unknown-id');
}

async function loadProductDetails() {
    const productId = getQueryParam('productId');
    if (!productId) {
        displayProductDetails(null);
        return;
    }

    const productData = new ProductData('products');
    try {
        const product = await productData.findProductById(productId);
        displayProductDetails(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        displayProductDetails(null);
    }
}

document.addEventListener('DOMContentLoaded', loadProductDetails);