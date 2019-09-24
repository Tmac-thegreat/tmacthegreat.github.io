// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e){
  document.getElementById('results').style.display = 'none';
  
  document.getElementById('loader').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults(){
  console.log('calculating....');
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  const principal = parseFloat(amount.value);
  const  calculatedInterest = parseFloat(interest.value) /100 / 12;
  const  calculatedPayments = parseFloat(years.value) * 12;
  
  // monthly payments
  const x =Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);
  if(isFinite(monthly)){
  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly * calculatedPayments).toFixed(2);
  totalInterest.value = ((monthly * calculatedPayments)- principal).toFixed(2);

  document.getElementById('results').style.display = 'block';
  
  document.getElementById('loader').style.display = 'none';
  } else{
    showError('Please check your numbers');
  } 
      
}

function showError(error){
  document.getElementById('results').style.display = 'none';
  
  document.getElementById('loader').style.display = 'none';

  const errorDiv = document.createElement('div');

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';

  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading); 

  setTimeout(errorClear, 3000);
}

function errorClear(){
  document.querySelector('.alert').remove();
}