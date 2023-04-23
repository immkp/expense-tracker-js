const balance = document.getElementById("balance")
const money_plus = document.getElementById("money-plus")
const money_minus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")
const type = document.getElementById("options")

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
)

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : []

function addTransaction(e) {
  e.preventDefault()
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("please add text and amount")
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      type: type.value,
      amount: amount.value,
    }

    transactions.push(transaction)

    addTransactionDOM(transaction)
    updateValues()
    updateLocalStorage()
    text.value = ""
    amount.value = ""
    type.value = "income"
  }
}

function generateID() {
  return Math.floor(Math.random() * 1000000000)
}

function addTransactionDOM(transaction) {
  const sign = transaction.type == "expense" ? "-" : "+"
  const item = document.createElement("li")
  item.classList.add(transaction.type == "expense" ? "minus" : "plus")

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
    `
  list.appendChild(item)
}

function updateValues() {
 let total=0,income=0,expense=0
 console.log(transactions)
 for (let i = 0; i < transactions.length; i++) {
  if (transactions[i].type == "income") {
   total += parseInt(transactions[i].amount)
   income += parseInt(transactions[i].amount)
  }
  else {
   total -= parseInt(transactions[i].amount)
   expense += parseInt(transactions[i].amount) 
  }
 }

  balance.innerText = `$${total.toFixed(2)}`
  money_plus.innerText = `$${income.toFixed(2)}`
  money_minus.innerText = `$${expense.toFixed(2)}`
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id)
  updateLocalStorage()
  Init()
}
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions))
}

function Init() {
  list.innerHTML = ""
  transactions.forEach(addTransactionDOM)
  updateValues()
}

Init()

form.addEventListener("submit", addTransaction)
