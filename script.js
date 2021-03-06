const user = [

]

const form = document.querySelector('.form');
const firstName = document.querySelector('#firstName');
const firstnameError = document.querySelector('#firstName-error')
const emailError = document.querySelector('.invalid-feedback')

const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const emailForm = document.querySelector('.emailForm')
const userOutput = document.querySelector('.userOutput')
const allInputs = document.querySelectorAll('input')
const btnEdit = document.querySelector('.btn-edit')
const btnAdd = document.querySelector('.btn-add')
const dataInfo = document.querySelector('.dataInfo')

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
        email.classList.remove('is-valid');
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

   userOutput.innerHTML += 

     ` <div class="eachUser bg-white py-2 d-flex justify-content-between mb-3 rounded shadow">
             <div class="userData px-1">
               <h4><span>${item.firstName}</span> <span>${item.lastName}</span></h4>
               <h6>${item.email}</h6>
               <div class="idHidden">${item.id}</div>
             </div>
             <div class="buttons d-flex align-items-center mx-1">
              <button class="btn-danger mx-4"><i class="fas fa-user-slash"></i></button>
              <button class="btn-info"><i class="fas fa-user-edit"></i></button>
             </div>
        </div>`
        
  })
}

// Remove user from userOutput
userOutput.addEventListener('click', removeEditUser)

function removeEditUser(e){
   if(e.target && e.target.classList[1] == 'fa-user-slash'){
        e.target.parentNode.parentNode.parentNode.remove();
      }

      if(e.target.classList[1] == 'fa-user-slash'){
        let dynamicEmail = e.target.parentNode.parentNode.parentNode.children[0].firstElementChild.nextElementSibling.innerText;
        console.log((dynamicEmail));
            user.forEach((item, index)=>{
              let i = index;
              

                  if(dynamicEmail === item.email){
                    dataInfo.innerText = ` ${item.firstName} ${item.lastName} - ${item.email} removed from dB and userList`
                    setTimeout(()=>{
                      dataInfo.innerText = "";
                    },2000)
                      
                    user.splice(i, 1)
                    console.log('index: ' + i);
                  }
            })
      }

    
     editUser(e);
}

function editUser(e){
  //Edit user
      if(e.target.classList[1] == 'fa-user-edit'){
        
        let dynamicFirstName =  e.target.parentNode.parentNode.parentNode.children[0].firstElementChild.firstChild.innerText;
        let dynamicLastName = e.target.parentNode.parentNode.parentNode.children[0].firstElementChild.lastChild.innerText
        let dynamicEmail = e.target.parentNode.parentNode.parentNode.children[0].firstElementChild.nextElementSibling.innerText;
        let dynamicId = e.target.parentNode.parentNode.parentNode.children[0].lastElementChild.innerText;
        console.log(e.target.parentNode.parentNode.parentNode.children[0].firstElementChild.nextElementSibling.innerText);
        
        firstName.value = dynamicFirstName
        lastName.value = dynamicLastName
        email.value = dynamicEmail
       

        // Hide add button and show Edit button
         btnAdd.classList.add('hide')
         btnAdd.classList.remove('show')
         btnEdit.classList.add('show')
         btnEdit.classList.remove('hide')

        
        btnEdit.addEventListener('click', edit);
        // Enter key triggers edit funktion instead of validate
        form.addEventListener('submit', edit);
        

        // FUNCTION EDIT
        function edit(e){
              e.preventDefault();
            
              for(i=0; i<user.length; i++){
                if(dynamicId === user[i].id){

              let tempArray = [{
                id: '',
                firstName:'',
                lastName: '',
                email: ''
              }];

              /* Validation of edited Userdata  */
              
                tempArray[0].id = Date.now().toString();
                tempArray[0].firstName = firstName.value
                tempArray[0].lastName = lastName.value;
                tempArray[0].email = email.value;

                 while((firstName.value === '' || firstName.value.length < 2) || (lastName.value === '' || lastName.value.length < 2)){
                  
                  //firstName.value = 'TRYCK PÅ REDIGERAKNAPPEN IGEN!'
                  //lastName.value = 'TRYCK PÅ REDIGERAKNAPPEN IGEN!'
                  //email.value = 'TRYCK PÅ REDIGERAKNAPPEN IGEN!'
                
                  editUser(e.target.classList[1] == 'fa-user-edit')
                 
                  
                  firstName.classList.remove('is-invalid');
                  firstName.classList.add('is-valid');
                  return false;
                  
                }
              
                    
                
         /*        if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value))){
                /* 
                  firstName.value = 'TRYCK PÅ REDIGERAKNAPPEN IGEN >>'
                  lastName.value = 'TRYCK PÅ REDIGERAKNAPPEN IGEN >>'
                  email.value = 'Vill du ÄNDRA mailadressen? Tryck Redigera IGEN>>' */

                  //firstName.value = firstName.value
                  //lastName.value = lastName.value
                  //email.value = email.value 
                  //emailError.innerText = 'HOPPSAN!'
                  
                  //editUser(e.target.classList[1] == 'fa-user-edit')
                  /* firstName.classList.remove('is-invalid');
                  firstName.classList.add('is-valid');
                  return false; 
                } */

                user.splice(i,1,tempArray[0])

                  printList()
                  form.reset()
                  email.classList.add('is-valid');
                  email.classList.remove('is-invalid');
              }  
            }

            // Hide Edit button and show Add button
                  btnAdd.classList.remove('hide')
                  btnAdd.classList.add('show')
                  btnEdit.classList.remove('show')
                  btnEdit.classList.add('hide')
          }
      }   
}
