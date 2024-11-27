class User {
    constructor(name, phone, email, role) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    // Simulate fetching user data (you could use an actual API call here)
    static fetchUserData() {
        // Return user data from the testUserData object
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = JSON.parse(localStorage.getItem('userDetails'))
                const userData = {
                    "name": data.name,
                    "phone": data.phone,
                    "email": data.email,
                }
                resolve(userData); // Resolves with the hardcoded test data
            }, 100); // Simulate a quick API delay
        });
    }
}

// Hardcoded test data (to simulate user data)
// let testUserData = {
//     username: 'john_doe',
//     name: 'John Doe',
//     phone: '123-456-7890',
//     email: 'johndoe@example.com',
//     gender: 'Male'
// };

// List of medicines (simulating data you might fetch from a backend)
const medicines = [
    { name: 'Aspirin', description: 'Used for pain relief, fever, and inflammation.', price: '$5.99' },
    { name: 'Ibuprofen', description: 'Commonly used to reduce fever and treat pain or inflammation.', price: '$8.50' },
    { name: 'Paracetamol', description: 'Relieves pain and reduces fever. Available over the counter.', price: '$4.20' },
    { name: 'Amoxicillin', description: 'An antibiotic used to treat various bacterial infections.', price: '$12.00' },
    { name: 'Vitamin C', description: 'An essential vitamin for immune support and skin health.', price: '$3.99' },
    { name: 'Cetirizine', description: 'Antihistamine used to treat allergy symptoms.', price: '$7.99' },
    { name: 'Omeprazole', description: 'Used to treat acid reflux and stomach ulcers.', price: '$10.50' },
    { name: 'Loratadine', description: 'Used for relief from allergy symptoms like runny nose and sneezing.', price: '$6.00' }
];

document.querySelector('.navbar-item.consult').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    handleConsultClick();
});

function handleConsultClick() {
    fetchLoginStatus().then(isLoggedIn => {
        if (!isLoggedIn) {
            // Redirect to homepage if not logged in
            window.location.href = "login.html";
        } else {
            // Proceed to the consult page if logged in
            window.location.href = "consult.html";
        }
    });
}

function fetchLoginStatus() {
    return new Promise((resolve) => {
        // Check localStorage for the login flag
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        resolve(isLoggedIn);
    });
}

// Function to display medicines in the results
function displayMedicines(filteredMedicines) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = "";  // Clear previous results

    filteredMedicines.forEach(medicine => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${medicine.product_name}</h3>
            <p class="price">${medicine.product_price}</p>
        `;
        resultContainer.appendChild(card);
    });
}

// Function to filter medicines based on search input
async function filterMedicines() {
    const searchQuery = document.getElementById('searchBar').value.trim().toLowerCase();

    // Clear the display if the search query is empty
    if (searchQuery === "") {
        displayMedicines([]); // Display empty results
        return;
    }

    try {
        // Call the medicine search endpoint
        const response = await fetch(`https://telemed-9lml.onrender.com/medicine/search?product_name=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the results from the API response
        const filteredMedicines = await response.json();

        // Pass the filtered medicines to the display function
        displayMedicines(filteredMedicines);
    } catch (error) {
        console.error("Failed to fetch medicines:", error);

        // Optionally, show an error message to the user
        alert("Medicine not found. Please try again.");
    }
}


// Initially display all medicines
// displayMedicines(medicines);


// // Simulate login status
// function fetchLoginStatus() {
//     return new Promise((resolve) => {
//         // Simulate login status (set to true for logged-in)
//         setTimeout(() => {
//             resolve(false); // Change to `false` for logged out status
//         }, 500); // A very short delay to simulate fetching login status
//     });
// }

function checkLoginStatus() {
    fetchLoginStatus().then(isLoggedIn => {
        const loginButton = document.getElementById('loginButton');
        const userIcon = document.getElementById('userIcon');
        const consultButton = document.getElementById('consultButton');
        const pendingButton = document.getElementById('pendingButton');

        const role = localStorage.getItem('role')

        if (isLoggedIn) {
            loginButton.style.display = 'none'; // Hide login button
            userIcon.style.display = 'inline-block'; // Show user icon
            pendingButton.style.display = 'inline-block'; // Show user icon
            fetchAndStoreUserData(); // Fetch and store user details when logged in
        } else {
            loginButton.style.display = 'inline-block'; // Show login button
            userIcon.style.display = 'none'; // Hide user icon
        }
        if (role == 'doctor') {
            consultButton.style.display = 'none';
        }
    });
}

let userData = null;

// Function to fetch and store user data
function fetchAndStoreUserData() {
    User.fetchUserData().then(data => {
        userData = data; // Store the fetched user data
    });
}

function showUserDetails() {
    if (userData) {
        document.getElementById('name').textContent = userData.name;
        document.getElementById('phone').textContent = userData.phone;
        document.getElementById('email').textContent = userData.email;

        // if (userData.consult != '') {
        //     document.getElementById('consultText').textContent = userData.consult;
        // } else {
        //     document.getElementById('consultText').textContent = 'No pending Consultation';
        // }

        // Create a Log Out button if it doesn't already exist
        let logoutButton = document.getElementById('logoutButton');
        if (!logoutButton) {
            logoutButton = document.createElement('button');
            logoutButton.id = 'logoutButton';
            logoutButton.textContent = 'Log Out';
            logoutButton.style.display = 'block';
            logoutButton.style.margin = '30px auto'; // Centers the button
            logoutButton.style.padding = '15px 30px';
            logoutButton.style.backgroundColor = '#ff4d4d';
            logoutButton.style.color = '#ffffff';
            logoutButton.style.border = 'none';
            logoutButton.style.borderRadius = '10px'; // Slightly rounded corners
            logoutButton.style.fontSize = '18px';
            logoutButton.style.fontWeight = 'bold';
            logoutButton.style.cursor = 'pointer';
            logoutButton.style.width = '50%';

            logoutButton.addEventListener('mouseover', () => {
                logoutButton.style.backgroundColor = '#ff6666'; // Lighter red
                logoutButton.style.transform = 'scale(1.05)'; // Slightly larger
            });
            logoutButton.addEventListener('mouseout', () => {
                logoutButton.style.backgroundColor = '#ff4d4d'; // Original red
                logoutButton.style.transform = 'scale(1)'; // Reset size
            });


            // Add click event to handle log out
            logoutButton.addEventListener('click', logOutUser);

            // Append the button to the modal
            const modalContent = document.querySelector('#userModal .modal-content');
            modalContent.appendChild(logoutButton);
        }

        // Show modal immediately
        document.getElementById('userModal').style.display = 'block';
    }
}

// Function to handle user log out
async function logOutUser() {
    // Perform log-out logic (e.g., clear session, reset UI)
    const role = localStorage.getItem('role')
    const authToken = localStorage.getItem('authToken')
    var response

    try {
        if (role == 'patient') {
            const endpoint = `https://telemed-9lml.onrender.com/users/logout`;

            response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                }
            });
        }
        else if (role == 'doctor') {
            const endpoint = `https://telemed-9lml.onrender.com/doctors/logout`;

            response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                }
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        console.log("User logged out!");

        // Hide user icon and show login button
        document.getElementById('userIcon').style.display = 'none';
        document.getElementById('loginButton').style.display = 'inline-block';

        // Clear user data and close the modal
        userData = null;
        document.getElementById('userModal').style.display = 'none';

        // Optionally, update the pending button visibility
        // document.getElementById('pendingButton').style.display = 'none';

        localStorage.clear();
        window.location.href = "index.html";

    } catch (e) {
        console.log(e)
    }
}

window.onclick = function (event) {
    const modal = document.getElementById('userModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Initially check login status and load user data
checkLoginStatus();
// Event listener for the search bar to filter dynamically
// document.getElementById('searchBar').addEventListener('keyup', filterMedicines);
// Attach event listener to user icon for showing user details
document.getElementById('userIcon').addEventListener('click', showUserDetails);