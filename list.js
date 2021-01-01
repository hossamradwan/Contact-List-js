var addRow = 1; 
var id = 0; //to make the id unique
var removeButtons = [];
var editButtons = [];
var rows = [];
var cell1 = [];
var cell2 = [];
var cell3 = [];
var cell4 = [];
var changeContact = 0;
var clickedButton = 0
var table = document.getElementById('dataTable');

class ContactList{
    constructor(name)
    {
        this.name = name
        this.contacts = [];
    }
    addContact(contact)
    {
        this.contacts.push(contact);
        rows[id] = table.insertRow(addRow);
        rows[id].id = id;
        cell1[id] = rows[id].insertCell(0);
        cell2[id]=  rows[id].insertCell(1);
        cell3[id] = rows[id].insertCell(2);
        cell4[id] = rows[id].insertCell(3);
        
        cell1[id].innerHTML = contact.name;
        cell2[id].innerHTML = contact.email;
        cell3[id].innerHTML = contact.phone;

        removeButtons[id] = document.createElement("input");
        removeButtons[id].classList.add("removeButton");
        removeButtons[id].type = "image";
        removeButtons[id].src = "remove.png";
        removeButtons[id].id = id;
        
        removeButtons[id].addEventListener('click',deleteFromForm);
        cell4[id].appendChild(removeButtons[id]);

        editButtons[id] = document.createElement('input');
        editButtons[id].classList.add("editButton");
        editButtons[id].type = "image";
        editButtons[id].src = "edit.png"
        editButtons[id].id = id;
        editButtons[id].addEventListener('click',updateInForm);
        cell4[id].appendChild(editButtons[id]);

        addRow += 1;
        id += 1; //to make the id unique
    }
    removeContact(id)
    {       
        var intId = parseInt(id);
        var row = document.getElementById(intId);
        row.parentNode.removeChild(row);
        this.contacts[id] = null;
        addRow -= 1;
    }
    editContact(id, updateobject)
    {
        console.log("edited id", id);
        cell1[id].innerHTML  = updateobject.name;
        cell2[id].innerHTML  = updateobject.email;
        cell3[id].innerHTML  = updateobject.phone;
        this.contacts[id] = updateobject;
    }
};
class Contact{  
    constructor(id,name, email, phone)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;        
    }
}
ContactsArray = new ContactList("list_1");

function addInForm()
{
    document.getElementById('Invalid').style.display = 'none';
    var enterdEmail = document.getElementById('emailBox').value;
    var pattern = new RegExp(".@gmail\.com");
    var checkEmail = pattern.test(enterdEmail);   
    enteredPhone = document.getElementById('phoneBox').value;
    var phoneCheck = false;
    if(enteredPhone.length == 11 && isNaN(enteredPhone) == false)
    {
        phoneCheck = true;
    }

    if(checkEmail &&  phoneCheck)
    {
        var enteredName = document.getElementById('nameBox').value;
        var detectTwoNames = 0;
        for(var detectSpace = 0; detectSpace < enteredName.length; detectSpace++)
        {
            if(enteredName[detectSpace] === ' ')
            {
                detectTwoNames = 1;
                break;
            }
        }
        var checkedName = '';
        if(detectTwoNames === 1)
        {
            checkedName +=  enteredName [0];
            checkedName += '.';
            for(var detectSecondName = detectSpace + 1; detectSecondName < enteredName.length; detectSecondName++)
            {
                checkedName += enteredName[detectSecondName];
            }
        }   
        else{
            checkedName = enteredName;
        } 
        contact1 = new Contact (id,checkedName, enterdEmail, enteredPhone ); 
        Object.defineProperty(contact1,'id',{writable: false});  //to make id un-writable
        if (changeContact == 0)
        {
            console.log("new");
            ContactsArray.addContact(contact1); 
        }
        else if (changeContact == 1)
        {
            console.log("edit");
            changeContact = 0;
            ContactsArray.editContact(clickedButton, contact1); 
        }
    }
    if(checkEmail == false || phoneCheck == false)
    {
        document.getElementById('Invalid').style.display = 'inline';
    }
}
function updateInForm(event)
{
    clickedButton = event.target.id;
    changeContact = 1;
    console.log(clickedButton);
    document.getElementById('nameBox').value = ContactsArray.contacts[clickedButton].name;
    document.getElementById('emailBox').value = ContactsArray.contacts[clickedButton].email;
    document.getElementById('phoneBox').value = ContactsArray.contacts[clickedButton].phone;
}

function deleteFromForm (event)
{
    clickedButton = event.target.id;
    console.log(clickedButton);
    ContactsArray.removeContact(clickedButton);
}
var save = document.getElementById('submitButton');
save.addEventListener('click',addInForm);










