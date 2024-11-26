// Toggle between login and sign-up forms
document.getElementById('toggleButton').addEventListener('click', function () {
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
        toggleText.textContent = 'Already have an account?';
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
document.getElementById('submitUserType').addEventListener('change', function () {
    const userType = this.value;
    const specialtySection = document.getElementById('specialtySection');

    if (userType === 'doctor') {
        specialtySection.style.display = 'block'; // Show specialty options for doctors
    } else {
        specialtySection.style.display = 'none'; // Hide specialty options for patients
    }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const role = document.getElementById('userType').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log(JSON.stringify({ email, password }))

    try {
        // Send login request to the backend
        let response
        if (role == 'patient') {
            response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            // Process successful response
            const data = await response.json();
            const { token, user } = data;
            console.log(user)

            // Save the token to localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userDetails', JSON.stringify(user));
        }
        else if (role == 'doctor') {
            response = await fetch('http://localhost:3000/doctors/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            // Process successful response
            const data = await response.json();
            const { token, doctor } = data;
            console.log(doctor)

            // Save the token to localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userDetails', JSON.stringify(doctor));
        }


        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        // On successful login
        localStorage.setItem('isLoggedIn', 'true');



        localStorage.setItem('role', role)

        // Redirect to the homepage or another secure page
        window.location.href = 'index.html';

    } catch (error) {
        // Show error message
        document.getElementById('errorMessage').textContent = error.message;
    }
});


// Handle sign-up form submission
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const age = document.getElementById('Age').value;
    const userType = document.getElementById('submitUserType').value;
    const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : '';
    const specialty = document.querySelector('input[name="specialty"]:checked') ? document.querySelector('input[name="specialty"]:checked').value : '';
    const startTime = document.querySelector('input[name="startTime"]:checked') ? document.querySelector('input[name="startTime"]:checked').value : '';
    const endTime = document.querySelector('input[name="endTime"]:checked') ? document.querySelector('input[name="endTime"]:checked').value : '';

    console.log(email)
    // Validate that the passwords match
    if (newPassword !== confirmPassword) {
        document.getElementById('errorMessage').textContent = "Passwords do not match.";
        return;
    }

    // If doctor, ensure specialty is selected
    if (userType === 'doctor' && !specialty) {
        document.getElementById('errorMessage').textContent = "Please select a specialty.";
        return;
    }

    // Simulate sign-up (this should be replaced by sending data to the server)
    console.log("Sign-Up Successful for:", newUsername, userType, specialty);
    // window.location.href = "index.html"; // Redirect to homepage
});
