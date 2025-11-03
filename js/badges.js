document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const addToCartSection = document.querySelector('.add-to-cart-section');
        if (addToCartSection && !document.getElementById('trust-badges-container')) {
            const badgeImages = [
                'https://raw.githubusercontent.com/amine3radi/card-badges-cod/70225cac4926414edb57c995873b61d5a2956756/payment.svg',
                'https://raw.githubusercontent.com/amine3radi/card-badges-cod/c4947426cfb41cbfc86091a9615e136b894d0dd4/return%20product.svg',
                'https://www.svgrepo.com/show/352446/shipping-fast.svg',
                'https://raw.githubusercontent.com/amine3radi/card-badges-cod/ccce0c0f04f9692926a932d3e3a75f64c35eb19e/cash-on-delivery.svg'
            ];
            const newBadgesContainer = document.createElement('div');
            newBadgesContainer.id = 'trust-badges-container';
            let badgesHTML = '';
            badgeImages.forEach(url => {
                badgesHTML += `<img src="${url}" alt="Trust Badge">`;
            });
            newBadgesContainer.innerHTML = badgesHTML;
            addToCartSection.parentNode.insertBefore(newBadgesContainer, addToCartSection.nextSibling);
        }
    }, 500);
});
