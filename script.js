const user = [
 {
  id: 1,
  firstName: 'Nisse',
  lastName: 'Karlsson',
  email: 'nils.karlsson@email.com'
 },
 {
  id: 2,
  firstName: 'Olle',
  lastName: 'Olsson',
  email: 'olle.olsson@email.com'
 },
 {
  id: 3,
  firstName: 'Pelle',
  lastName: 'Petterson',
  email: 'pelle.petterson@email.com'
 },
]

const form = document.querySelector('.form');
const firstName = document.querySelector('#firstName');
const firstnameError = document.querySelector('#firstName-error')


const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const userOutput = document.querySelector('.userOutput')
const allInputs = document.querySelectorAll('input')

/* const validateFirstName=()=>{
 if(firstName.value === ''){
  firstnameError.innerText = 'Måste fyllas i med text!'
 }else if(firstName.value.length < 2){
  firstnameError.innerText = 'Måste fyllas i med minst två tecken!'
 }else{
  firstnameError.innerText = ''
 }
} */

const validate = (id)=> {
 let input = document.querySelector(id);
 let error = document.querySelector(id + '-error');

 if(input.value.trim() === ''){
  error.innerText = 'Måste fyllas i med text!'
  input.classList.remove('is-valid');
  input.classList.add('is-invalid')
  input.focus();
  return false;
 }else if(input.value.trim().length < 2){
  error.innerText = 'Måste fyllas i med minst två tecken!'
  input.classList.remove('is-valid');
  input.classList.add('is-invalid')
  input.focus();
  return false;
 }else{
  error.innerText = '';
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  return true;
 }
}

const validateEmail = (_email) => {
  let error = document.querySelector('#email-error');

  if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(_email.value)) {
    _email.classList.add('is-valid');
    _email.classList.remove('is-invalid');
    console.log('YEPP');
    return true;
  }
  else {
    _email.classList.remove('is-valid');
    _email.classList.add('is-invalid');
    error.innerText = 'En godkänd e-postadress krävs!'
    _email.focus();
     console.log('NOP');
    return false;
  }
}

form.addEventListener('submit', (e)=>{
 e.preventDefault();
 validate('#firstName');
 validate('#lastName');
 validateEmail(email);

 if(validate('#firstName') && validate('#lastName') && validateEmail(email)){
  //Nu kan vi skicka in användarobjektet i en array + displaya på sidan
  console.log('Gick bra!');
  form.reset();
 }else {
  console.log('Funkade inte');
 }
 // validateFirstName(e.currentTarget)
 // let firstName = e.currentTarget.firstName.value;
/*  let lastName = e.currentTarget.lastName.value;
 let email = e.currentTarget.email.value; */
 

 /* const user2 = 
  {
   firstName: firstName,
   lastName: lastName,
   email: email,
  }
 
 let testArray = [];
 testArray += testArray.push(user2);


console.log(testArray); */


})

const printList = ()=>{
 userOutput.innerHTML = '';

 user.forEach(item =>{
  userOutput.innerHTML += 

    ` <div class="eachUser bg-white py-2 d-flex justify-content-between mb-3 rounded shadow">
            <div class="userData px-1">
              <h4>${item.firstName} ${item.lastName}</h4>
              <h6>${item.email}</h6>
            </div>
            <div class="buttons d-flex align-items-center mx-3">
             <button class="btn-danger"><i class="fas fa-user-slash"></i></button>
             <button class="btn-info"><i class="fas fa-user-edit"></i></button>
            </div>
       </div>`
 })

}
printList();