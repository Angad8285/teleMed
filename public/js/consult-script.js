doctorPopup.style.display = 'none';

// Simulated User Data Class
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

// List of doctors (simulating data you might fetch from a backend)
const doctors = [{
        name: "Dr. John Doe",
        specialty: "Cardiologist",
        description: "Dr. John Doe is a renowned Cardiologist specializing in heart diseases.",
        image: "https://via.placeholder.com/350x200?text=Doctor+Image", // Doctor's image URL
        availableTimes: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"]
    },
    {
        name: "Dr. Jane Smith",
        specialty: "Dermatologist",
        description: "Dr. Jane Smith is a skilled Dermatologist known for her expertise in skin treatments.",
        image: "https://via.placeholder.com/350x200?text=Doctor+Image", // Doctor's image URL
        availableTimes: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]
    },
    {
        name: "Dr. Emily White",
        specialty: "Pediatrician",
        description: "Dr. Emily White is a trusted Pediatrician with years of experience in child healthcare.",
        image: "https://via.placeholder.com/350x200?text=Doctor+Image", // Doctor's image URL
        availableTimes: ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM"]
    }
];

// Simulate login status
function fetchLoginStatus() {
    return new Promise((resolve) => {
        // Simulate login status (set to true for logged-in)
        setTimeout(() => {
            resolve(true); // Change to `false` for logged out status
        }, 500); // A very short delay to simulate fetching login status
    });
}

// Function to display doctors in the results
function displayDoctors(filteredDoctors) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = ""; // Clear previous results

    filteredDoctors.forEach(doctor => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${doctor.image}" alt="Doctor Image" class="card-image">
            <h3>${doctor.name}</h3>
            <p>Specialty: ${doctor.specialty}</p>
            <p class="price">Consultation Fee: ${doctor.consultationFee}</p>
        `;
        resultContainer.appendChild(card);
    });
}

// Function to filter doctors based on search input
function filterDoctors() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const selectedSpecialty = document.getElementById('specialtySelect').value.toLowerCase();

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchQuery) || doctor.specialty.toLowerCase().includes(searchQuery);
        const matchesSpecialty = selectedSpecialty === "" || doctor.specialty.toLowerCase() === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    displayDoctors(filteredDoctors);
}

// Function to check login status and show the user icon if logged in
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

// Global variable to store user data for quick access
let userData = null;

// Function to fetch and store user data
function fetchAndStoreUserData() {
    User.fetchUserData().then(data => {
        userData = data; // Store the fetched user data
    });
}

// Function to show user details when user icon is clicked
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

// Close modal when clicking outside the modal (if needed)
window.onclick = function(event) {
    const modal = document.getElementById('userModal');
    const doctorPopup = document.getElementById('doctorPopup');
    const chatHistoryPopup = document.getElementById('chatHistoryPopup');

    // If the click is outside the doctorPopup, close it
    if (event.target === doctorPopup) {
        doctorPopup.style.display = 'none';
    }

    // If the click is outside the chatHistoryPopup, close it
    if (event.target === chatHistoryPopup) {
        chatHistoryPopup.style.display = 'none'; // Hide the chat history popup
    }
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Simulated Previous Consultations Data
const previousConsultations = [{
        doctor: "Dr. John Doe",
        specialty: "Cardiologist",
        date: "2024-10-10",
        fee: "$100"
    },
    {
        doctor: "Dr. Jane Smith",
        specialty: "Dermatologist",
        date: "2024-09-20",
        fee: "$80"
    },
    {
        doctor: "Dr. Michael Brown",
        specialty: "Neurologist",
        date: "2024-08-15",
        fee: "$150"
    },
    {
        doctor: "Dr. John Doe",
        specialty: "Cardiologist",
        date: "2024-10-10",
        fee: "$100"
    },
    {
        doctor: "Dr. Jane Smith",
        specialty: "Dermatologist",
        date: "2024-09-20",
        fee: "$80"
    },
    {
        doctor: "Dr. Michael Brown",
        specialty: "Neurologist",
        date: "2024-08-15",
        fee: "$150"
    },
];

// Function to show previous consultations in the side panel
function showPreviousConsultations() {
    const consultationsList = document.getElementById('consultationsList');
    consultationsList.innerHTML = ''; // Clear previous consultations

    previousConsultations.forEach(consultation => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h4>${consultation.doctor}</h4>
            <p>Specialty: ${consultation.specialty}</p>
            <p>Date: ${consultation.date}</p>
            <p>Fee: ${consultation.fee}</p>
        `;
        consultationsList.appendChild(li);
    });
}

// Call the function to display previous consultations
showPreviousConsultations();

// Function to toggle the visibility of the side panel
// Toggle the side panel visibility
function toggleSidePanel() {
    const sidePanel = document.getElementById('sidePanel');
    sidePanel.classList.toggle('active'); // Toggle the active class to show/hide the panel
}

// Close the side panel if user clicks outside of it
window.addEventListener('click', function(event) {
    const sidePanel = document.getElementById('sidePanel');
    const triggerButton = document.getElementById('showSidePanel');

    // If the click is outside of the side panel and not on the button, close the panel
    if (!sidePanel.contains(event.target) && !triggerButton.contains(event.target) && sidePanel.classList.contains('active')) {
        sidePanel.classList.remove('active'); // Close the side panel
    }
});

// Add click listener to the show button to open the side panel
document.getElementById('showSidePanel').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent this click from triggering the outside click listener
    toggleSidePanel(); // Toggle the panel open
});


// Sample consultations data with chat history for each consultation
const consultations = [{
        id: 1,
        doctor: "Dr. John Doe",
        specialty: "Cardiologist",
        date: "2024-10-15",
        chatHistory: [{
                time: "10:00 AM",
                message: "Patient: I feel some chest pain."
            },
            {
                time: "10:05 AM",
                message: "Doctor: I recommend a stress test."
            }
        ]
    },
    {
        id: 2,
        doctor: "Dr. Jane Smith",
        specialty: "Dermatologist",
        date: "2024-11-01",
        chatHistory: [{
                time: "11:00 AM",
                message: "Patient: I have a skin rash on my arm."
            },
            {
                time: "11:10 AM",
                message: "Doctor: I suggest using a mild steroid cream."
            }
        ]
    },
    // Add more consultations as needed...
];

// Function to display consultations in the side panel
function displayConsultations() {
    const consultationsList = document.getElementById('consultationsList');
    consultationsList.innerHTML = ""; // Clear previous list

    consultations.forEach((consultation) => {
        const card = document.createElement('li');
        card.classList.add('consultation-card');
        card.innerHTML = `
            <h4>${consultation.doctor} - ${consultation.specialty}</h4>
            <p>Date: ${consultation.date}</p>
        `;
        card.addEventListener('click', () => showChatHistory(consultation.id)); // Add click listener
        consultationsList.appendChild(card);
    });
}

// Function to show the chat history popup for a selected consultation
function showChatHistory(consultationId) {
    // Find the consultation by ID
    const consultation = consultations.find(c => c.id === consultationId);

    // Show the chat history popup
    const chatHistoryPopup = document.getElementById('chatHistoryPopup');
    const chatHistoryContent = document.getElementById('chatHistoryContent');
    chatHistoryPopup.style.display = 'flex'; // Make the popup visible (using flex to center it)

    // Clear previous chat history content
    chatHistoryContent.innerHTML = "";

    // Display the chat history
    consultation.chatHistory.forEach(chat => {
        const chatMessage = document.createElement('p');
        chatMessage.innerHTML = `<strong>${chat.time}</strong>: ${chat.message}`;
        chatHistoryContent.appendChild(chatMessage);
    });
}

// Close the chat history popup when clicking outside of it
// window.onclick = function(event) {
//     const chatHistoryPopup = document.getElementById('chatHistoryPopup');
//     if (event.target === chatHistoryPopup) {
//         chatHistoryPopup.style.display = 'none'; // Hide the popup if clicked outside
//     }
// }

// Initially display all consultations when the side panel is shown
displayConsultations();


// Function to filter doctors based on search input
function displayDoctors(filteredDoctors) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = "";  // Clear previous results

    filteredDoctors.forEach(doctor => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${doctor.image}" alt="Doctor Image" class="card-image">
            <h3>${doctor.name}</h3>
            <p>Specialty: ${doctor.specialty}</p>
            <p class="price">Consultation Fee: $100</p>
        `;
        // Add click event to open doctor details popup
        card.addEventListener('click', () => openDoctorPopup(doctor));  
        resultContainer.appendChild(card);
    });
}

// Function to filter doctors based on search query and specialty
function filterDoctors() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const selectedSpecialty = document.getElementById('specialtySelect').value.toLowerCase();

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchQuery) || doctor.specialty.toLowerCase().includes(searchQuery);
        const matchesSpecialty = selectedSpecialty === "" || doctor.specialty.toLowerCase() === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    displayDoctors(filteredDoctors);
}

// Function to open the doctor's details popup
function openDoctorPopup(doctor) {
    // Get the popup elements
    const doctorPopup = document.getElementById('doctorPopup');
    const doctorName = document.getElementById('doctorName');
    const doctorSpecialty = document.getElementById('doctorSpecialty');
    const doctorDescription = document.getElementById('doctorDescription');
    const doctorImage = document.getElementById('doctorImage');
    const appointmentTime = document.getElementById('appointmentTime');

    // Set the popup content
    doctorName.textContent = doctor.name;
    doctorSpecialty.textContent = doctor.specialty;
    doctorDescription.textContent = doctor.description;
    doctorImage.src = doctor.image;  // Set the doctor's image

    // Clear previous available times
    appointmentTime.innerHTML = "";

    // Populate the dropdown with available appointment times
    doctor.availableTimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        appointmentTime.appendChild(option);
    });

    // Show the popup
    doctorPopup.style.display = 'flex';
}

// Close the doctor's popup when the close button is clicked
document.getElementById('closeDoctorPopup').addEventListener('click', () => {
    const doctorPopup = document.getElementById('doctorPopup');
    doctorPopup.style.display = 'none';
});

// Close the doctor's popup if the user clicks outside of it
// window.onclick = function(event) {
//     const doctorPopup = document.getElementById('doctorPopup');
//     if (event.target === doctorPopup) {
//         doctorPopup.style.display = 'none';
//     }
// };

// Initialize the event listeners for search and specialty filter
document.getElementById('searchBar').addEventListener('input', filterDoctors);
document.getElementById('specialtySelect').addEventListener('change', filterDoctors);

// Initially check login status and load user data
checkLoginStatus();

// Initially display all doctors

// Attach event listener to user icon for showing user details
document.getElementById('userIcon').addEventListener('click', showUserDetails);

