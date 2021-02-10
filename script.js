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

const form = document.querySelector('form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('email');
const userOutput = document.querySelector('.userOutput')

form.addEventListener('submit', (e)=>{
 e.preventDefault();
 const firstName = firstName.value;
 const lastName = tName.value;
 const email = email.value;


})

const printList = ()=>{
 userOutput.innerHTML = '';

 user.forEach(item =>{
  userOutput.innerHTML += 

    ` <div class="eachUser bg-white py-2 d-flex justify-content-between mb-2  rounded shadow">
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