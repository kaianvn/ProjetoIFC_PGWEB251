let profs = [];
let currentProfId = null;

function openModal(modalId){
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId){
    document.getElementById(modalId).style.display = "none";
}

const btAddProf = document.getElementById("addProf");
btAddProf.addEventListener("click", function(){
    currentProfId = null;
    document.getElementById("profForm").reset();
    openModal("profModal");
});

document.querySelectorAll(".close").forEach(function(closeBt){
    closeBt.addEventListener("click", function(){
        closeModal("profModal");
    });
});

//carrega os profs como linhas da tabela
function renderProfs() {
  const tbody = document.querySelector('#profsTable tbody');
  tbody.innerHTML = '';
  fetch('http://localhost:3000/professores')
    .then(response => response.json())
    .then(data => {
        profs = data;
        console.log(profs);
        
        profs.forEach((prof, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${prof.nomeProf}</td>
            <td>${prof.email}</td>
            <td>${prof.sala}</td>
            <td>
                <button onclick="editProf(${index})">Editar</button>
                <button onclick="deleteProf(${index})">Excluir</button>
            </td>
            ` ;
            tbody.appendChild(row);
        });
    });
}

function editProf(index) {
    const prof = profs[index];
    document.getElementById('codigo').value = prof.codigo;
    document.getElementById('nomeProf').value = prof.nomeProf;
    document.getElementById('email').value = prof.email;
    document.getElementById('sala').value = prof.sala;
    currentProfId = prof.codigo;
    openModal("profModal");
}

function deleteProf(index) {
    const prof = profs[index];
    const profId = prof.codigo;

    if (confirm(`Tem certeza que deseja excluir o professor ${prof.nomeProf}?`)) {
        fetch(`http://localhost:3000/professores/${profId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete professor');
            }
            console.log('Professor deleted successfully');
            renderProfs();
        })
        .catch(error => {
            console.error('Error deleting professor:', error);
            alert('Falha ao excluir o professor.');
        });
    }
}

function addProf(codigo, nomeProf, email, sala) {
    let prof = {nome: nomeProf, email, sala};
    console.log(prof);

    return fetch('http://localhost:3000/professores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prof)
    })
    .then(response => response.json())
    .catch(error => console.error('Error adding professor:', error));
}

function updateProf(codigo, nomeProf, email, sala) {
    let prof = {nome: nomeProf, email, sala};
    
    return fetch(`http://localhost:3000/professores/${codigo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prof)
    })
    .then(response => response.json())
    .catch(error => console.error('Error updating professor:', error));
}

const profForm = document.getElementById("profForm");
profForm.addEventListener("submit", function(event){
    event.preventDefault();
    const codigo = document.getElementById('codigo').value;
    const nomeProf = document.getElementById('nomeProf').value;
    const email = document.getElementById('email').value;
    const sala = document.getElementById('sala').value;

    let promise;
    if (currentProfId !== null) {
        promise = updateProf(codigo, nomeProf, email, sala);
    } else {
        promise = addProf(codigo, nomeProf, email, sala);
    }

    // After the promise resolves, then update the UI
    promise.then(() => {
        closeModal("profModal");
        currentProfId = null; // Reset the state
        renderProfs(); // Re-render the table once
    });
});

renderProfs();