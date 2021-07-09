const itemList = document.getElementById('list');
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const form = document.getElementById('form');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === 0) {
    alert("Please add text and amount!");
  }

  else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    }

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    updateStorage();

    text.value = '';
    amount.value = '';
  }
}

function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateStorage();
  init();
}

function generateID() {
  return Math.random();
}

function addTransactionDOM(transaction) {
  const item = document.createElement('li');
  const sign = transaction.amount < 0 ? '-' : '+';

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span><button class="delete-btn" onClick="deleteTransaction(${transaction.id})">x</button>`;

  itemList.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, val) => acc += val, 0);
  const income = amounts.filter(val => val > 0).reduce((acc, val) => acc += val, 0);
  const expense = amounts.filter(val => val < 0).reduce((acc, val) => acc += val, 0) * -1;

  const sign = total >= 0 ? '' : '-';

  balance.innerHTML = `${sign}$${Math.abs(total)}`;
  money_plus.innerHTML = `$${income}`;
  money_minus.innerHTML = `$${expense}`;

}

function updateStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  itemList.innerHTML = "";

  // transactions.forEach(transaction => addTransactionDOM(transaction));
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
