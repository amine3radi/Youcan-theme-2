document.addEventListener('DOMContentLoaded', function() {
    // Set phone input to type="tel" for number pad
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.setAttribute('type', 'tel');
        phoneInput.setAttribute('inputmode', 'decimal');
    }

    // Fix iPhone auto-zoom issue
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
});
