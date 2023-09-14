document.addEventListener('DOMContentLoaded',()=>{
    fetch('http://127.0.0.1:5000/getInfo')
    .then(response=>response.json())
    .then(data=>loadHTMLTable(data['data']))
    
})

const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function(){
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";

    fetch('http://127.0.0.1:5000/insert',{
        headers : {
            'Content-type' : 'application/json'
        },
        method : 'POST',
        body: JSON.stringify({name:name})
    })
    .then(response => response.json())
    .then(data=>insertRowIntoTable(data['data']))   
}

function insertRowIntoTable(data){
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableNull = table.querySelector('.no-data');
    let tableHTML ="<tr>";

    for(let key in data){
        if(data.hasOwnProperty(key)){
            if(key == 'dateAdded'){
                data[key] = new Date(data[key]).toLocaleString()
            }
        }
        tableHTML += `<td>${data[key]}</td>`
    }

    tableHTML += `<td><button class='delete-btn' data-id='${data.id}'>Delete</button></td>
        <td><button class='edit-btn' data-id='${data.id}'>Edit</button></td>
        </tr>`
    

}

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');

    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
        return;
    }

    let tableHTML ="";
    data.forEach(({id,name,dateAdded}) => {
        tableHTML += `<tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${dateAdded}</td>
        <td><button class='delete-btn' data-id='${id}'>Delete</button></td>
        <td><button class='edit-btn' data-id='${id}'>Edit</button></td>
        </tr>`
    });

    table.innerHTML = tableHTML;
}