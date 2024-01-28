// Initialize variables
let expenses = [];
let totalAmount = 0;

// Get DOM elements
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Event listener for add button
addBtn.addEventListener('click', function() {
    // Get input values
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Validate input values
    if (category === '') {
        alert("Please select a category");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount ");
        return;
    }
    if (date === '') {
        alert("Please select a date");
        return;
    }

    // Add expense and update total amount
    expenses.push({ category, amount, date });
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    // Create new row in expenses table
    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    // Configure delete button
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        // Get expense to be deleted
        const expense = expenses[expenses.length - 1];

        // Remove expense and update total amount
        expenses.splice(expenses.indexOf(expense), 1);
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        // Remove row from expenses table
        expensesTableBody.removeChild(newRow);
    });

    // Display expense details in the row
    const expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
});

// Loop through expenses to display them in the table
for (const expense of expenses) {
    totalAmount += expense.amount;

    // Create new row in expenses table
    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    // Configure delete button
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        // Get expense to be deleted
        expenses.splice(expenses.indexOf(expense), 1);

        // Update total amount and remove row from expenses table
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;
        expensesTableBody.removeChild(newRow);
    });

    // Display expense details in the row
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}

// Update total amount display
totalAmountCell.textContent = totalAmount;
