const form = document.querySelector('#form-contact');
const contactInput = document.querySelector('#contact');
const filter = document.querySelector('#filtre');
const clearBtn = document.querySelector('.suppression-contact');
const contactList = document.querySelector('.list-group');


loadEventListeners();

function loadEventListeners() {
    
        // Charger le DOM
    
    document.addEventListener('DOMContentLoaded',getContacts);
    
        // Validation du formulaire
    
    form.addEventListener('submit',addContact);
    
        // Vider la liste des contacts
    
    clearBtn.addEventListener('click',clearContacts);
    
        // Suppression des contacts 
    
    contactList.addEventListener('click',removeContacts);
    
        // Filtrer les contacts
    
    filter.addEventListener('keyup',filterContacts);
}

function getContacts() {
    
        // Va chercher les données stockées localement
    
    let contacts;
    
    if(localStorage.getItem('contacts') === null) {
        
        contacts = [];
    }
    
    else {
        
        contacts = JSON.parse(localStorage.getItem('contacts'));
    }
    
    contacts.forEach(function(contact) {
        
        // Création des li pour afficher le contenu des champs
    
    const li = document.createElement('li');
    
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(contact));
    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="far fa-times-circle fa-pull-right"></i>';
    
    li.appendChild(link);
    
    contactList.appendChild(li);
        
    });
    
}

function addContact(e) {
    
    if(contactInput.value === '') {
        
        alert('Ajoutez un contact');
        
    }
    
        // Création des li pour afficher le contenu des champs
    
    const li = document.createElement('li');
    
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(contactInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="far fa-times-circle fa-pull-right"></i>';
    
    li.appendChild(link);
    
    contactList.appendChild(li);
    
        // Stocker le contact dans le localstorage
    
    storeContactInLocalStorage(contactInput.value);
    
    contactInput.value = '';
    
e.preventDefault();

}

function storeContactInLocalStorage(contact) {
    
    let contacts;
    
    if(localStorage.getItem('contacts') === null) {
        
        contacts = [];
    }
    
    else {
        
        contacts = JSON.parse(localStorage.getItem('contacts'));
    }
    
    contacts.push(contact);
    
    localStorage.setItem('contacts',JSON.stringify(contacts));
}

function clearContacts() {
    
    //contactList.innerHTML = '';
    while(contactList.firstChild) {
        contactList.removeChild(contactList.firstChild);
    }
    
    clearContactFromLocalStorage();
    
}

function clearContactFromLocalStorage() {
    
    localStorage.clear() ;
}

function removeContacts(e) {
    
    if(e.target.parentElement.classList.contains('delete-item')) {
        
        if(confirm("Etes-vous sûr de vouloir supprimer ce contact ?")) {
            
            e.target.parentElement.parentElement.remove();
        }
    }
    
        // Suppression du local storage
    
    removeContactsFromLocalStorage(e.target.parentElement.parentElement);
    
}

function removeContactsFromLocalStorage(contactItem) {
    
    let contacts;

    if(localStorage.getItem('contacts') === null) {
        
        contacts = [];
    }
    
    else {
        
        contacts = JSON.parse(localStorage.getItem('contacts'));
    }
    
    contacts.forEach(function(contact,index) {
    
        if(contactItem.textContent === contact) {
            
            contacts.splice(index,1);
        }
        
    });
    
    localStorage.setItem('contacts',JSON.stringify(contacts));
}

function filterContacts(e) {
    
    const text = e.target.value.toLowerCase();
    //console.log(text);
    
    document.querySelectorAll('.list-group-item').forEach(function(contact) {
    
        const item = contact.firstChild.textContent;
        
        if(item.toLowerCase().indexOf(text) != -1) {
            
            contact.style.display = 'block';
        }
        
        else {
            
            contact.style.display = 'none';
        }
        
    });
}

