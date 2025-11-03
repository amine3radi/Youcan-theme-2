---
#### **File 2: `main.js`**
*(This single file contains ALL your scripts, perfectly organized and guaranteed to run at the right time)*
```javascript
(function() {
    'use strict';
    
    // This master listener ensures all our code runs after the page is fully ready.
    document.addEventListener('DOMContentLoaded', function() {

        // =======================================================================
        // 1. OFFER SCRIPTS 
        // =======================================================================
        
        // Add "bundle-heading" class to the offer section title
        const optionContainers = document.querySelectorAll('.single-variants');
        optionContainers.forEach(container => {
            if (container.querySelector('.textual-buttons-container')) {
                const heading = container.querySelector('.option-name');
                if (heading) {
                    heading.classList.add('bundle-heading');
                }
            }
        });

        // Add Badges and Prices to Offers (Your working "slow clicker" script)
        setTimeout(() => {
            const offerLabels = document.querySelectorAll('.textual-button label');
            if (offerLabels.length > 1) { offerLabels[1].classList.add('best-offer'); }
            if (offerLabels.length > 2) { offerLabels[2].classList.add('best-value'); }

            const currency = document.querySelector('.single-product .single-price .currency')?.textContent || 'ريال سعودي';
            const variantInputs = document.querySelectorAll('.single-variant [type=radio]');
            let originallySelected = document.querySelector('.single-variant [type=radio]:checked') || (variantInputs.length > 0 ? variantInputs[0] : null);
            let variantPrices = [];
            let currentIndex = 0;

            function getPriceForVariant(input, index) {
                input.checked = true;
                input.dispatchEvent(new Event('change', { bubbles: true }));
                setTimeout(() => {
                    const currentPrice = document.querySelector('.single-product .single-price .value')?.textContent || '';
                    const beforePrice = document.querySelector('.single-product .before.currency-value .value')?.textContent || '';
                    variantPrices[index] = { current: currentPrice, before: beforePrice };
                    currentIndex++;
                    if (currentIndex < variantInputs.length) {
                        getPriceForVariant(variantInputs[currentIndex], currentIndex);
                    } else {
                        addPricesToLabels();
                        setTimeout(() => {
                            if (originallySelected) {
                                originallySelected.checked = true;
                                originallySelected.dispatchEvent(new Event('change', { bubbles: true }));
                            }
                        }, 200);
                    }
                }, 400);
            }

            function addPricesToLabels() {
                variantInputs.forEach((input, index) => {
                    const label = document.querySelector(`label[for="${input.id}"]`);
                    if (label && !label.querySelector('.offer-price-container') && variantPrices[index] && variantPrices[index].current) {
                        const priceContainer = document.createElement('div');
                        priceContainer.className = 'offer-price-container';
                        let priceHTML = `<span class="current-price">${variantPrices[index].current} ${currency}</span>`;
                        if (variantPrices[index].before) {
                            priceHTML += `<span class="before-price">${variantPrices[index].before} ${currency}</span>`;
                        }
                        priceContainer.innerHTML = priceHTML;
                        label.appendChild(priceContainer);
                    }
                });
            }
            if (variantInputs.length > 0) {
                getPriceForVariant(variantInputs[0], 0);
            }
        }, 1000);

        // =======================================================================
        // 2. FORM SCRIPTS
        // =======================================================================

        const phoneInput = document.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.setAttribute('type', 'tel');
            phoneInput.setAttribute('inputmode', 'decimal');
        }
        function resetZoom() {
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                const originalContent = viewport.getAttribute('content');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0');
                setTimeout(() => { viewport.setAttribute('content', originalContent); }, 100);
            }
        }
        const formInputs = document.querySelectorAll('.checkout-form input, .checkout-form textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', resetZoom);
        });

        // =======================================================================
        // 3. BADGE SCRIPTS
        // =======================================================================
        
        setTimeout(() => {
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
})();
</script>
