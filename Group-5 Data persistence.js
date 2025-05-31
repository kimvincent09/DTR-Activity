// Global variables
let timeRecords = JSON.parse(localStorage.getItem('timeRecords')) || [];
let currentTimeIn = null;
let currentTimeOut = null;

// DOM Elements
const employeeIdInput = document.getElementById('employeeId');
const employeeNameInput = document.getElementById('employeeName');
const timeInBtn = document.getElementById('timeInBtn');
const timeOutBtn = document.getElementById('timeOutBtn');
const timeInDisplay = document.getElementById('timeInDisplay');
const timeOutDisplay = document.getElementById('timeOutDisplay');
const recordsBody = document.getElementById('recordsBody');

// Input Validation - Only allow numeric characters in employee ID
employeeIdInput.addEventListener('input', (e) => {
    employeeIdInput.value = e.target.value.replace(/\D/g, '');
});

// Time In Button Handler
timeInBtn.addEventListener('click', () => {
    if (!employeeIdInput.value || !employeeNameInput.value) {
        alert('Please fill in both Employee ID and Name.');
        return;
    }

    currentTimeIn = new Date();
    currentTimeOut = null; // Reset timeOut
    timeInDisplay.textContent = currentTimeIn.toLocaleTimeString();
    timeOutDisplay.textContent = ''; // Clear previous Time Out
});

// Time Out Button Handler
timeOutBtn.addEventListener('click', () => {
    if (!currentTimeIn) {
        alert('Please record time in before clocking out.');
        return;
    }

    currentTimeOut = new Date();
    timeOutDisplay.textContent = currentTimeOut.toLocaleTimeString();

    const hoursWorked = (currentTimeOut - currentTimeIn) / (1000 * 60 * 60);

    if (hoursWorked <= 0) {
        alert('Invalid hours. Time out must be after time in.');
        return;
    }

    if (hoursWorked > 8) {
        alert('Invalid hours. Maximum allowed is 8 hours.');
        return;
    }

    const record = {
        employeeId: employeeIdInput.value,
        employeeName: employeeNameInput.value,
        date: currentTimeOut.toLocaleDateString(),
        timeIn: currentTimeIn.toLocaleTimeString(),
        timeOut: currentTimeOut.toLocaleTimeString(),
        hoursWorked: hoursWorked.toFixed(2)
    };

    timeRecords.push(record);
    localStorage.setItem('timeRecords', JSON.stringify(timeRecords)); // Data persistence

    updateRecordsTable();
    currentTimeIn = null;
    currentTimeOut = null;
    timeInDisplay.textContent = '';
    timeOutDisplay.textContent = '';
});

// Update Records Table Function
function updateRecordsTable() {
    recordsBody.innerHTML = '';

    if (timeRecords.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="4">No records available.</td>`;
        recordsBody.appendChild(emptyRow);
        return;
    }

    timeRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.timeIn}</td>
            <td>${record.timeOut}</td>
            <td>${record.hoursWorked}</td>
        `;
        recordsBody.appendChild(row);
    });
}

// Initialize table on page load
updateRecordsTable();
