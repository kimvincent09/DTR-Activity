# Daily Time Record (DTR) Application

A simple web-based Daily Time Record system with intentional bugs for learning purposes.

## Features

- Employee information input
- Time in/out recording
- Daily time record display
- Hours worked calculation

## Known Bugs

1. **Time In Button**: The time in button doesn't properly validate employee information before recording time in.

2. **Employee Information Validation**: The system allows time in without requiring employee information to be filled.

3. **Time Out Without Time In**: Users can record time out without having a time in record.

4. **Hours Calculation**: The hours worked calculation is incorrect and doesn't account for different days.

5. **Missing Time In Check**: The system doesn't verify if a time in record exists before recording time out.

6. **Empty Records Handling**: The records table update function doesn't properly handle empty records.

7. **Employee ID Validation**: No validation for employee ID format.

8. **Non-numeric Employee ID**: The system allows non-numeric characters in the employee ID field.

9. **Data Persistence**: All records are lost when the page is refreshed.

10. **Error Handling**: No error handling for invalid date/time operations.

## How to Use

1. Open `index.html` in a web browser
2. Enter employee information
3. Click "Time In" to record time in
4. Click "Time Out" to record time out
5. View the records in the table below

## Learning Objectives

This application is designed to help developers practice debugging by identifying and fixing common JavaScript issues. Each bug represents a different type of problem that might occur in real-world applications.

## Files

- `index.html`: Main application interface
- `styles.css`: Application styling
- `script.js`: Application logic (contains bugs)
- `README.md`: This documentation file 