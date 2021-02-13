const user = [

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

//VALIDATE TEXT INPUTS
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

//VALIDATE EMAILS
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

//CHECK UNIQUE EMAILS
const checkUniqueEmail = (__email) => {
  let error = document.querySelector('#email-error');
  for(i=0; i< user.length; i++){
  if(user[i].email === (__email))
   {
    email.classList.add('is-invalid');
    error.innerText =   `E-mail ${__email} finns redan på plats ${i}. Fyll i unik epost!`
    return true
  }
 }
}

/* 
EVENT ON FORM 
 -> Create Users
 -> Invoke checkUniqueEmails function 
 -> PrintOut Users
*/

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  validate('#firstName');
  validate('#lastName');
  validateEmail(email);

 if(validate('#firstName') && validate('#lastName') && validateEmail(email)){
  //Nu kan vi skicka in användarobjektet i en array + displaya på sidan
   let firstName = e.currentTarget.firstName.value;
   let lastName = e.currentTarget.lastName.value;
   let email = e.currentTarget.email.value;

   const user2 = 
   {
    id: Date.now().toString(),
    firstName: firstName,
    lastName: lastName,
    email: email,
   }
    // checkUniqueEmail(email) & create users
       if(!checkUniqueEmail(email)){
        user.push(user2)
       }else{
        email.classList.add('is-invalid');
       }
    // end of checkUniqueEmail(email)

    // Invoke PrintOut Users
   printList();
   form.reset();
 }else {
  console.log('Funkade inte');
 }

})



//Print out users
const printList = ()=>{
 userOutput.innerHTML = '';

  user.forEach(item =>{
    //Testa att lägga till ett unikt id på <h6> för varje varv
    // Id:t ska dean matchas mot den <h6> som har en removeknapp som syskon.
    
    console.log(item.id);
    
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

// Remove user from userOutput
userOutput.addEventListener('click', (e)=> {
  if(e.target && e.target.classList[1] == 'fa-user-slash'){
     e.target.parentNode.parentNode.parentNode.remove();
  }

  if(e.target.classList[1] == 'fa-user-slash'){
    let dynamicEmail = e.target.parentNode.parentNode.parentNode.children[0].lastElementChild.innerText;
    user.forEach((item, index)=>{
      let i = index;
      console.log(i);
      if(dynamicEmail === item.email){
        console.log(`  ${item.email}  ${i} removed from database and userList`);
        console.log(user);
        user.splice(i, 1)
        console.log(user);

      }
    })
    
    // console.log(dynamicEmail);
  }



 /*  if(e.target.parentNode.parentNode.parentNode.children[0].lastElementChild.innerText === user[1].email){
    console.log('SAAAMMMA');
  }
 */
   
    
    
})