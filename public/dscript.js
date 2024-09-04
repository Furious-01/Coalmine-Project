// Function to handle showing specific sections
function showSection(sectionId) {
    const sections = ['dashboardContent', 'registrationForm', 'workersInfo', 'equipments', 'notifications'];
    sections.forEach(id => {
        document.getElementById(id).style.display = (id === sectionId) ? 'block' : 'none';
    });
}

// Event listeners for sidebar links
document.getElementById('overviewLink').addEventListener('click', function(event) {
    event.preventDefault();
    showSection('dashboardContent');
});

document.getElementById('newUsersLink').addEventListener('click', function(event) {
    event.preventDefault();
    showSection('registrationForm');
});

document.getElementById('workersInfoLink').addEventListener('click', function(event) {
    event.preventDefault();
    showSection('workersInfo');
});

document.getElementById('equipmentsLink').addEventListener('click', function(event) {
    event.preventDefault();
    showSection('equipments');
    loadEquipments(); // Ensure the equipment list is loaded when section is shown
});

document.getElementById('notificationsLink').addEventListener('click', function(event) {
    event.preventDefault();
    showSection('notifications');
    loadNotifications(); // Ensure the notifications log is loaded when section is shown
});

// Function to handle form submission for sending notifications
document.getElementById('sendNotificationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture form data
    const notificationData = {
        username: document.getElementById('workerUsername').value,
        message: document.getElementById('notificationMessage').value
    };

    // Send the data to the server
    fetch('/api/sendNotification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Notification sent successfully!');
            // Clear form fields and reload notifications log
            document.getElementById('sendNotificationForm').reset();
            loadNotifications(); // Reload notifications log to include the newly added notification
        } else {
            alert('Error sending notification');
        }
    })
    .catch(error => console.error('Error:', error));
});

// Function to load and display existing notifications data
function loadNotifications() {
    fetch('/api/getNotifications')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#notificationsLog tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(notification => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${notification.username}</td>
                    <td>${notification.message}</td>
                    <td>${new Date(notification.date).toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching notifications:', error));
}

// Function to handle form submission for adding new equipment
document.getElementById('addEquipmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture form data
    const equipmentData = {
        machineNo: document.getElementById('machineNo').value,
        machineType: document.getElementById('machineType').value,
        machineStatus: document.getElementById('machineStatus').value
    };

    // Send the data to the server
    fetch('/api/addEquipment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(equipmentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Equipment added successfully!');
            // Clear form fields and reload equipment list
            document.getElementById('addEquipmentForm').reset();
            loadEquipments(); // Reload equipment list to include the newly added equipment
        } else {
            alert('Error adding equipment');
        }
    })
    .catch(error => console.error('Error:', error));
});

// Function to load and display existing equipment data
function loadEquipments() {
    fetch('/api/getEquipments')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#equipmentsTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(equipment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${equipment.machineNo}</td>
                    <td>${equipment.machineType}</td>
                    <td>${equipment.machineStatus}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching equipment data:', error));
}

// Function to handle form submission for worker registration
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture form data
    const workerData = {
        fullName: document.querySelector('input[placeholder="Full Name"]').value,
        username: document.querySelector('input[placeholder="Username"]').value,
        gender: document.querySelector('input[placeholder="Gender"]').value,
        bloodGroup: document.querySelector('input[placeholder="Blood Group"]').value,
        address: document.querySelector('input[placeholder="Address"]').value,
        pinCode: document.querySelector('input[placeholder="Pin Code"]').value,
        email: document.querySelector('input[placeholder="Email"]').value,
        phoneNumber: document.querySelector('input[placeholder="Phone Number"]').value,
        dob: document.querySelector('input[placeholder="Date of Birth"]').value,
        fatherName: document.querySelector('input[placeholder="Father\'s Name"]').value,
        fatherNumber: document.querySelector('input[placeholder="Father\'s Number"]').value,
        fatherAddress: document.querySelector('input[placeholder="Father\'s Address"]').value
    };

    // Save the data to the server
    fetch('/api/registerWorker', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workerData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful!');
            // Clear form fields
            document.getElementById('userForm').reset();
        } else {
            alert('Error registering worker');
        }
    })
    .catch(error => console.error('Error:', error));
});

// Example data for workers (Replace with actual API call or database query)
const workersData = [
    {
        username: 'john_doe',
        fullName: 'John Doe',
        gender: 'Male',
        bloodGroup: 'O+',
        address: '123 Main St',
        pinCode: '123456',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        dob: '1980-01-01',
        fatherName: 'Robert Doe',
        fatherNumber: '0987654321',
        fatherAddress: '456 Elm St'
    },
    // Add more worker objects as needed
];

// Function to search and display worker info
function searchWorker() {
    const username = document.getElementById('usernameInput').value.trim();
    const worker = workersData.find(w => w.username.toLowerCase() === username.toLowerCase());

    if (worker) {
        document.getElementById('workerFullName').textContent = worker.fullName;
        document.getElementById('workerUsername').textContent = worker.username;
        document.getElementById('workerGender').textContent = worker.gender;
        document.getElementById('workerBloodGroup').textContent = worker.bloodGroup;
        document.getElementById('workerAddress').textContent = worker.address;
        document.getElementById('workerPinCode').textContent = worker.pinCode;
        document.getElementById('workerEmail').textContent = worker.email;
        document.getElementById('workerPhoneNumber').textContent = worker.phoneNumber;
        document.getElementById('workerDOB').textContent = worker.dob;
        document.getElementById('workerFatherName').textContent = worker.fatherName;
        document.getElementById('workerFatherNumber').textContent = worker.fatherNumber;
        document.getElementById('workerFatherAddress').textContent = worker.fatherAddress;
        document.getElementById('workerDetails').style.display = 'block';
    } else {
        alert('Worker not found');
        document.getElementById('workerDetails').style.display = 'none';
    }
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', searchWorker);