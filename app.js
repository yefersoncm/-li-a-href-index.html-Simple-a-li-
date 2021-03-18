document.getElementById('presupuesto').addEventListener('submit', saveGasto);



function saveGasto(e){
  let nombreGasto = document.getElementById('nombreGasto').value;
  let valorGasto = document.getElementById('valorGasto').value;
  const gasto = {
      nombreGasto,
      valorGasto
    };

  if(localStorage.getItem('gastos')=== null){
    let gastos = [];
    gastos.push(gasto);
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }

  else{
    let gastos = JSON.parse(localStorage.getItem('gastos'));
    gastos.push(gasto);
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }
  document.getElementById('presupuesto').reset();
  getGastos();


  presupuestoRestante();
  e.preventDefault();
}



function getGastos(){
  let gastos = JSON.parse(localStorage.getItem('gastos'));
  let gastosView = document.getElementById('listaGastos');
  let totalPresupuestoView = document.getElementById('totalPresupuesto');
  let presupuestoRestanteView = document.getElementById('presupuestoRestante');
  gastosView.innerHTML = '';

  for(let i=0; i<gastos.length; i++){
    let nombreGasto = gastos[i].nombreGasto;
    let valorGasto = gastos[i].valorGasto;
    gastosView.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
    ${nombreGasto}
    <span class="badge bg-primary rounded-pill">$ ${formatMoneyNumber(gastos[i].valorGasto)}</span>
  </li>`;
    totalPresupuestoView.innerHTML = `Presupuesto <span class="badge bg-primary rounded-pill">$ ${formatMoneyNumber(3100000)}</span>`;
    presupuestoRestanteView.innerHTML = `Presupuesto Restante <span id="pillPresupuesto" class="bordered badge rounded-pill">$ ${formatMoneyNumber(3100000-presupuestoRestante())}</span>`;
    colorEstadoPresupuesto();
  }
}

function colorEstadoPresupuesto(){
  let gastos = JSON.parse(localStorage.getItem('gastos'));
  let gastosTotales = 0;
  for(let i=0; i<gastos.length; i++){
    gastosTotales = gastosTotales + parseInt(gastos[i].valorGasto);
  }
  if ((gastosTotales/3100000)>0.5){
    if ((gastosTotales/3100000)>0.75){
      document.getElementById('pillPresupuesto').classList.toggle('bg-danger');
    }
    else{
      document.getElementById('pillPresupuesto').classList.toggle('bg-warning');
    }
  }
  else{
    document.getElementById('pillPresupuesto').classList.toggle('bg-primary');
  }
}

function presupuestoRestante(){
  let gastos = JSON.parse(localStorage.getItem('gastos'));
  let gastosTotales = 1;
  for(let i=0; i<gastos.length; i++){
    gastosTotales = gastosTotales + parseInt(gastos[i].valorGasto);
  }
  return gastosTotales;
}

function formatMoneyNumber(num) {
    if (!num || num == 'NaN') return '-';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + ',' + cents);
}




getGastos();
