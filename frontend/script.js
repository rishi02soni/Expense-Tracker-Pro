const API = "http://localhost:5000/expenses";

async function loadExpenses(){
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("expenseList");
  const total = document.getElementById("total");

  list.innerHTML = "";
  let sum = 0;

  data.forEach(item => {
    sum += item.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.title} (${item.category}) - ₹${item.amount}</span>
      <button onclick="deleteExpense('${item._id}')">❌</button>
    `;
    list.appendChild(li);
  });

  total.innerText = sum;
}

async function addExpense(){
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  await fetch(API,{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    body: JSON.stringify({title, amount, category})
  });

  loadExpenses();
}

async function deleteExpense(id){
  await fetch(`${API}/${id}`,{
    method:"DELETE"
  });

  loadExpenses();
}

loadExpenses();
