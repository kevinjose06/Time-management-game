document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (event) => {
        // Prevent the form from reloading the page
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        if (email === '' || password === '') {
            errorMessage.textContent = 'Please fill in both fields.';
        } else {
            // MODIFIED: Pass the destination as a URL parameter
            window.location.href = 'transition.html?redirect=dash.html';
        }
    });
});