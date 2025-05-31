// Global variables
let timeRecords = [];
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

// Bug 1: Missing event listener for time in button
timeInBtn.addEventListener('click', () => {
    const now = new Date();

    // Bug 2: Not validating if employee info is filled
    if (!employeeIdInput.value.trim() || !employeeNameInput.value.trim()) {
        alert('Please fill in employee information');
        return;
    }

    currentTimeIn = now;
    timeInDisplay.textContent = now.toLocaleTimeString();
});

// Bug 3: Time out button allows time out without time in
timeOutBtn.addEventListener('click', () => {
    if (!currentTimeIn) {
        alert('Please time in first');
        return;
    }

    const now = new Date();
    currentTimeOut = now;
    timeOutDisplay.textContent = now.toLocaleTimeString();

    try {
        // Bug 4: Incorrect hours calculation
        const hoursWorked = (currentTimeOut - currentTimeIn) / (1000 * 60 * 60);

        
        if (isNaN(hoursWorked) || hoursWorked < 0 || hoursWorked > 8) {
            throw new Error("Invalid or excessive hours worked.");
        }

        // Bug 5: Not checking if time in exists (already handled at the top)

        const record = {
            date: now.toLocaleDateString(),
            timeIn: currentTimeIn.toLocaleTimeString(),
            timeOut: now.toLocaleTimeString(),
            hoursWorked: hoursWorked.toFixed(2)
        };

        timeRecords.push(record);
        updateRecordsTable();

        // Reset session state
        currentTimeIn = null;
        currentTimeOut = null;
        timeInDisplay.textContent = '';
        timeOutDisplay.textContent = '';

    } catch (error) {
        alert('Error calculating work time: ' + error.message);
        console.error(error);
    }
});

// Bug 6: Function not properly handling empty records
function updateRecordsTable() {
    recordsBody.innerHTML = '';

    localStorage.setItem('timeRecords', JSON.stringify(timeRecords));

    if (timeRecords.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 4;
        cell.textContent = 'No records found';
        cell.style.textAlign = 'center';
        row.appendChild(cell);
        recordsBody.appendChild(row);
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

// Bug 7: Missing input validation for employee ID
employeeIdInput.addEventListener('input', (e) => {
    const originalValue = e.target.value;

    // Bug 8: Allows non-numeric characters in employee ID
    const numericValue = originalValue.replace(/\D/g, '');
    const limitedValue = numericValue.slice(0, 3);

    if (originalValue !== numericValue) {
        alert('Only numbers up to 3 digits are allowed for Employee ID.');
    }

    employeeIdInput.value = limitedValue;
});

// // Bug 9: Missing data persistence (records are lost on page refresh)


