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

// Event listener for the worker info card
document.getElementById('workerInfo').addEventListener('click', function() {
    showSection('workersInfo');
});

// Event listener for the new user card
document.getElementById('newuser').addEventListener('click', function() {
    showSection('registrationForm');
});
// Event listener for the equipment user card
document.getElementById('equipment').addEventListener('click', function() {
    showSection('equipments');
});
// Event listener for the notification user card
document.getElementById('notification').addEventListener('click', function() {
    showSection('notifications');
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