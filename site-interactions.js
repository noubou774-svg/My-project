/**
 * Learnivia — shared UI interactions (FAQ, donate form, sign-in helpers)
 */
(function () {
    /* FAQ accordion */
    document.querySelectorAll('.faq-question').forEach(function (button) {
        button.addEventListener('click', function () {
            var item = button.closest('.faq-item');
            if (!item) return;
            var wasOpen = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(function (other) {
                other.classList.remove('active');
            });
            if (!wasOpen) item.classList.add('active');
        });
    });

    /* Donate amount presets */
    var amountButtons = document.querySelectorAll('.amount-button');
    var customAmount = document.getElementById('customAmount');
    var selectedAmount = 50;

    if (amountButtons.length) {
        amountButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                amountButtons.forEach(function (b) { b.classList.remove('selected'); });
                btn.classList.add('selected');
                selectedAmount = Number(btn.dataset.amount) || 0;
                if (customAmount) customAmount.value = '';
            });
        });
        amountButtons[1]?.classList.add('selected');
    }

    if (customAmount) {
        customAmount.addEventListener('input', function () {
            amountButtons.forEach(function (b) { b.classList.remove('selected'); });
            selectedAmount = Number(customAmount.value) || 0;
        });
    }

    var donorNote = document.getElementById('donor-note');
    var characterCount = document.getElementById('characterCount');
    if (donorNote && characterCount) {
        var updateCount = function () {
            characterCount.textContent = String(donorNote.value.length);
        };
        donorNote.addEventListener('input', updateCount);
        updateCount();
    }

    var donateButton = document.getElementById('donateButton');
    if (donateButton) {
        donateButton.addEventListener('click', function () {
            var amount = customAmount && customAmount.value
                ? Number(customAmount.value)
                : selectedAmount;
            if (!amount || amount < 1) {
                window.alert('Please choose or enter a donation amount.');
                return;
            }
            var freq = document.getElementById('frequency');
            var label = freq ? freq.options[freq.selectedIndex].text : 'One-time';
            window.alert(
                'Thank you! Your ' + label.toLowerCase() + ' donation of $' +
                amount + ' will be processed when payment is connected.'
            );
        });
    }

    /* Sign-in password toggle */
    document.querySelectorAll('.show-password').forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            var field = toggle.closest('.password-field, .password-wrapper');
            var input = field ? field.querySelector('input') : null;
            if (!input) return;
            var showing = input.type === 'text';
            input.type = showing ? 'password' : 'text';
            toggle.textContent = showing ? 'Show' : 'Hide';
            toggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
        });
    });

    /* Sign-in form — demo submit */
    var signinForm = document.querySelector('.signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', function (event) {
            event.preventDefault();
            window.location.href = 'index.html';
        });
    }

    var googleSignin = document.querySelector('.google-signin');
    if (googleSignin) {
        googleSignin.addEventListener('click', function () {
            window.alert('Google Sign In will be available when authentication is connected.');
        });
    }
})();
