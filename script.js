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


updateRecordsTable();

timeInBtn.addEventListener('click', () => {
    if (!employeeIdInput.value || !employeeNameInput.value) {
        alert('Please fill in employee information');
        return;
    }

    


    const now = new Date();
    currentTimeIn = now;
    timeInDisplay.textContent = now.toLocaleTimeString();
    console.log(currentTimeIn)
});

// Bug 3: Time out button allows time out without time in
timeOutBtn.addEventListener('click', () => {
    if (currentTimeIn == null) {
        alert('Please time in first');
        return;
    }

    const now = new Date();
    currentTimeOut = now;
    // currentTimeOut = now.setDate(now.getDate()+1); //for testing
    //currentTimeOut = now.setHours(now.getDate()); //for testi



    timeOutDisplay.textContent = now.toLocaleTimeString();
    console.log(currentTimeIn);
    

    // Bug 4: Incorrect hours calculation
    const hoursWorked = (currentTimeOut - currentTimeIn) / (1000*60*60);
    console.log(hoursWorked);

    if (hoursWorked > 8 && hoursWorked < 0){
        alert('you cannot Time out more than 8hrs');
        return;
    }

     
    // Bug 5: Not checking if time in exists
    const record = {
        date: now.toLocaleDateString(),
        timeIn: currentTimeIn.toLocaleTimeString(),
        timeOut: now.toLocaleTimeString(),
        hoursWorked: hoursWorked.toFixed(2)
    };

    timeRecords.push(record);
    updateRecordsTable();
    localStorage.setItem('timeRecords', JSON.stringify(timeRecords));
});

// Bug 6: Function not properly handling empty records
function updateRecordsTable() {
    if (timeRecords.length === 0) {
        recordsBody.innerHTML = '<tr><td colspan="4">No records found</td></tr>';
        return;
    }
    recordsBody.innerHTML = '';
    
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

// Bug 7: Missing input validation for employee IDG

employeeIdInput.addEventListener('input', (e) => {
    
    employeeIdInput.value = e.target.value;
    const empId = employeeIdInput.value;
    if (!/^\d+$/.test(empId)) {
        alert('Employee ID must be Numbers only');
        return;
    }
    // Bug 8: Allows non-numeric characters in employee ID
    if (empId.length !== 3) {
        alert('Employee ID must be exactly 3 numbers');
        return;
    }
});

// Bug 9: Missing data persistence (records are lost on page refresh)
// Bug 10: No error handling for invalid date/time operations