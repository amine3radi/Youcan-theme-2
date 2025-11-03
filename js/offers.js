function initOfferCustomizations() {
    // Add "bundle-heading" class
    const optionContainers = document.querySelectorAll('.single-variants');
    optionContainers.forEach(container => {
        if (container.querySelector('.textual-buttons-container')) {
            const heading = container.querySelector('.option-name');
            if (heading) heading.classList.add('bundle-heading');
        }
    });

    // Add Badges and Prices (Your working "slow clicker" script)
    setTimeout(() => {
        const offerLabels = document.querySelectorAll('.textual-button label');
        if (offerLabels.length > 1) offerLabels[1].classList.add('best-offer');
        if (offerLabels.length > 2) offerLabels[2].classList.add('best-value');

        const currency = document.querySelector('.single-product .single-price .currency')?.textContent || 'ريال سعودي';
        const variantInputs = document.querySelectorAll('.single-variant [type=radio]');
        let originallySelected = document.querySelector('.single-variant [type=radio]:checked') || (variantInputs.length > 0 ? variantInputs[0] : null);
        let variantPrices = [], currentIndex = 0;

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
                    if (variantPrices[index].before) priceHTML += `<span class="before-price">${variantPrices[index].before} ${currency}</span>`;
                    priceContainer.innerHTML = priceHTML;
                    label.appendChild(priceContainer);
                }
            });
        }
        if (variantInputs.length > 0) getPriceForVariant(variantInputs[0], 0);
    }, 1000);
}
