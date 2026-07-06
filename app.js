let customers = JSON.parse(localStorage.getItem('customers')) || [];

function save(){
  localStorage.setItem('customers', JSON.stringify(customers));
  render();
}

function addCustomer(){
  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;

  if(!name) return;

  customers.push({
    id: Date.now(),
    name,
    phone,
    balance: 0
  });

  document.getElementById('name').value='';
  document.getElementById('phone').value='';

  save();
}

function addDebt(id){
  let amount = prompt('Ποσό χρέωσης:');
  let c = customers.find(x=>x.id===id);
  c.balance += Number(amount||0);
  save();
}

function addPay(id){
  let amount = prompt('Ποσό πληρωμής:');
  let c = customers.find(x=>x.id===id);
  c.balance -= Number(amount||0);
  save();
}

function removeCustomer(id){
  customers = customers.filter(x=>x.id!==id);
  save();
}

function render(){
  let list = document.getElementById('list');
  list.innerHTML='';

  let total = 0;

  customers.forEach(c=>{
    total += c.balance;

    list.innerHTML += `
      <div class="card">
        <b>${c.name}</b> (${c.phone || '-'})
        <br>💰 ${c.balance}€
        <br><br>
        <button onclick="addDebt(${c.id})">+ Χρέωση</button>
        <button onclick="addPay(${c.id})">- Πληρωμή</button>
        <button onclick="removeCustomer(${c.id})">🗑️</button>
      </div>
    `;
  });

  document.getElementById('total').innerText = total;
}

render();
