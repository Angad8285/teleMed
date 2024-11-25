// Toggle between login and sign-up forms
document.getElementById('toggleButton').addEventListener('click', function() {
    const formHeader = document.getElementById('formHeader');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggleButton = document.getElementById('toggleButton');
    const toggleText = document.getElementById('toggleText');

    if (loginForm.style.display !== 'none') {
        // Show sign-up form and hide login form
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        formHeader.textContent = 'Sign Up';
        toggleButton.textContent = 'Login';
        toggleText.textContent = 'Already have an account? ';
    } else {
        // Show login form and hide sign-up form
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        formHeader.textContent = 'Login';
        toggleButton.textContent = 'Sign Up';
        toggleText.textContent = "Don't have an account? ";
    }
});

// Handle userType selection and dynamically show/hide specialty list
document.getElementById('userType').addEventListener('change', function() {
    const userType = this.value;
    const specialtySection = document.getElementById('specialtySection');

    if (userType === 'doctor') {
        specialtySection.style.display = 'block'; // Show specialty options for doctors
    } else {
        specialtySection.style.display = 'none'; // Hide specialty options for patients
    }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate login (this should be replaced by server-side authentication)
    if (username === "john_doe" && password === "password123") {
        window.location.href = "homepage.html"; // Redirect to homepage
    } else {
        document.getElementById('errorMessage').textContent = "Invalid username or password.";
    }
});

// Handle sign-up form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const age = document.getElementById('Age').value;
    const userType = document.getElementById('userType').value;
    const specialty = document.querySelector('input[name="specialty"]:checked') ? document.querySelector('input[name="specialty"]:checked').value : '';

    // Validate that the passwords match
    if (newPassword !== confirmPassword) {
        document.getElementById('errorMessage').textContent = "Passwords do not match.";
        return;
    }

    // Validate age (ensure it's a number and above a certain threshold)
    if (isNaN(age) || age < 18) {
        document.getElementById('errorMessage').textContent = "Please enter a valid age (18 or older).";
        return;
    }

    // If doctor, ensure specialty is selected
    if (userType === 'doctor' && !specialty) {
        document.getElementById('errorMessage').textContent = "Please select a specialty.";
        return;
    }

    // Simulate sign-up (this should be replaced by sending data to the server)
    console.log("Sign-Up Successful for:", newUsername, userType, specialty);
    window.location.href = "index.html"; // Redirect to homepage
});
