class User {
    constructor(username, fullName, phone, email) {
        this.username = username;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
    }

    // Simulate fetching user data (you could use an actual API call here)
    static fetchUserData() {
        // Return user data from the testUserData object
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(testUserData); // Resolves with the hardcoded test data
            }, 100); // Simulate a quick API delay
        });
    }
}

// Hardcoded test data (to simulate user data)
let testUserData = {
    username: 'john_doe',
    fullName: 'John Doe',
    phone: '123-456-7890',
    email: 'johndoe@example.com'
};

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

// Function to display medicines in the results
function displayMedicines(filteredMedicines) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = "";  // Clear previous results

    filteredMedicines.forEach(medicine => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${medicine.name}</h3>
            <p>${medicine.description}</p>
            <p class="price">${medicine.price}</p>
        `;
        resultContainer.appendChild(card);
    });
}

// Function to filter medicines based on search input
function filterMedicines() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();

    if (searchQuery === "") {
        displayMedicines([])
        return;
    }

    // Filter medicines based on the name or description matching the search query
    const filteredMedicines = medicines.filter(medicine => {
        return medicine.name.toLowerCase().includes(searchQuery) || medicine.description.toLowerCase().includes(searchQuery);
    });

    displayMedicines(filteredMedicines);
}

// Initially display all medicines
// displayMedicines(medicines);


// Simulate login status
function fetchLoginStatus() {
    return new Promise((resolve) => {
        // Simulate login status (set to true for logged-in)
        setTimeout(() => {
            resolve(false); // Change to `false` for logged out status
        }, 500); // A very short delay to simulate fetching login status
    });
}

function checkLoginStatus() {
    fetchLoginStatus().then(isLoggedIn => {
        const loginButton = document.getElementById('loginButton');
        const userIcon = document.getElementById('userIcon');

        if (isLoggedIn) {
            loginButton.style.display = 'none'; // Hide login button
            userIcon.style.display = 'inline-block'; // Show user icon
            fetchAndStoreUserData(); // Fetch and store user details when logged in
        } else {
            loginButton.style.display = 'inline-block'; // Show login button
            userIcon.style.display = 'none'; // Hide user icon
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
        document.getElementById('username').textContent = userData.username;
        document.getElementById('fullName').textContent = userData.fullName;
        document.getElementById('phone').textContent = userData.phone;
        document.getElementById('email').textContent = userData.email;

        // Show modal immediately
        document.getElementById('userModal').style.display = 'block';
    }
}

window.onclick = function(event) {
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