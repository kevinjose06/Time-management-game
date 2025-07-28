document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const profilePicInput = document.getElementById('profile-pic-input');
    const profilePicPreview = document.getElementById('profile-pic-preview');

    // ✅ Image preview on file select
    profilePicInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicPreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // ✅ Form submit with transition redirect
    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // prevent default form submission

        const formData = new FormData(signupForm);

        try {
            await fetch('sign_up.php', {
                method: 'POST',
                body: formData
            });

            // ✅ Redirect using transition screen
            window.location.href = 'transition.html?redirect=dash.html';

        } catch (err) {
            // Redirect anyway even if request fails
            console.error('Signup failed silently. Redirecting...');
            window.location.href = 'transition.html?redirect=dash.html';
        }
    });
});
