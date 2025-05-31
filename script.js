// Global variables
let timeRecords = [];
let currentTimeIn = null;
let currentTimeOut = null;

// DOM Elements
const employeeIdInput = document.getElementById("employeeId");
const employeeNameInput = document.getElementById("employeeName");
const timeInBtn = document.getElementById("timeInBtn");
const timeOutBtn = document.getElementById("timeOutBtn");
const timeInDisplay = document.getElementById("timeInDisplay");
const timeOutDisplay = document.getElementById("timeOutDisplay");
const recordsBody = document.getElementById("recordsBody");

// Bug 1: Missing event listener for time in button
timeInBtn.addEventListener("click", () => {
  const now = new Date();
  currentTimeIn = now;
  timeInDisplay.textContent = now.toLocaleTimeString();

  // Bug 2: Not validating if employee info is filled
  if (!employeeIdInput.value || !employeeNameInput.value) {
    alert("Please fill in employee information");
    return;
  }
});

// Bug 3: Time out button allows time out without time in
timeOutBtn.addEventListener("click", () => {
  const now = new Date();
  currentTimeOut = now;
  timeOutDisplay.textContent = now.toLocaleTimeString();

  // Bug 4: Incorrect hours calculation
  const hoursWorked = (currentTimeOut - currentTimeIn) / (1000 * 60 * 60);

  // Bug 5: Not checking if time in exists
  const record = {
    date: now.toLocaleDateString(),
    timeIn: currentTimeIn.toLocaleTimeString(),
    timeOut: now.toLocaleTimeString(),
    hoursWorked: hoursWorked.toFixed(2),
  };
  console.log;
  timeRecords.push(record);
  updateRecordsTable();
});

// Bug 6: Function not properly handling empty records
function updateRecordsTable() {
  recordsBody.innerHTML = "";

  timeRecords.forEach((record) => {
    const row = document.createElement("tr");
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
employeeIdInput.addEventListener("input", (e) => {
  // Bug 8: Allows non-numeric characters in employee ID
  employeeIdInput.value = e.target.value;
});

// Bug 9: Missing data persistence (records are lost on page refresh)
// Bug 10: No error handling for invalid date/time operations
// hello
