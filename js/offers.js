document.addEventListener('DOMContentLoaded', function() {
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
    setTimeout(function() {
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
            setTimeout(function() {
                const currentPrice = document.querySelector('.single-product .single-price .value')?.textContent || '';
                const beforePrice = document.querySelector('.single-product .before.currency-value .value')?.textContent || '';
                variantPrices[index] = { current: currentPrice, before: beforePrice };
                currentIndex++;
                if (currentIndex < variantInputs.length) {
                    getPriceForVariant(variantInputs[currentIndex], currentIndex);
                } else {
                    addPricesToLabels();
                    setTimeout(function() {
                        if (originallySelected) {
                            originallySelected.checked = true;
                            originallySelected.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }, 200);
                }
            }, 400);
        }

        function addPricesToLabels() {
            variantInputs.forEach(function(input, index) {
                const label = document.querySelector(`label[for="${input.id}"]`);
                if (label && !label.querySelector('.offer-price-container') && variantPrices[index]) {
                    const priceContainer = document.createElement('div');
                    priceContainer.className = 'offer-price-container';
                    const currentPriceEl = document.createElement('span');
                    currentPriceEl.className = 'current-price';
                    currentPriceEl.innerHTML = `${variantPrices[index].current} ${currency}`;
                    priceContainer.appendChild(currentPriceEl);
                    if (variantPrices[index].before) {
                        const beforePriceEl = document.createElement('span');
                        beforePriceEl.className = 'before-price';
                        beforePriceEl.innerHTML = `${variantPrices[index].before} ${currency}`;
                        priceContainer.appendChild(beforePriceEl);
                    }
                    label.appendChild(priceContainer);
                }
            });
        }
        if (variantInputs.length > 0) {
            getPriceForVariant(variantInputs[0], 0);
        }
    }, 1000);
});
