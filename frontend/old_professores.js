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
}

function editProf(index) {
    const prof = profs[index];
    document.getElementById('codigo').value = prof.codigo;
    document.getElementById('nomeProf').value = prof.nomeProf;
    document.getElementById('email').value = prof.email;
    document.getElementById('sala').value = prof.sala;
    currentProfId = index;
    openModal("profModal");
}

function deleteProf(index) {
    if (confirm("Tem certeza que deseja excluir este professor?")) {
        profs.splice(index, 1);
        renderProfs();
    }
}

function addProf(codigo, nomeProf, email, sala) {
    const prof = {
        codigo: codigo,
        nomeProf: nomeProf,
        email: email,
        sala: sala
    };
    profs.push(prof);
    renderProfs();
}

const profForm = document.getElementById("profForm");
profForm.addEventListener("submit", function(event){
    event.preventDefault();
    const codigo = document.getElementById("codigo").value;
    const nomeProf = document.getElementById("nomeProf").value;
    const email = document.getElementById("email").value;
    const sala = document.getElementById("sala").value;

    if (currentProfId !== null) {
        profs[currentProfId] = {codigo, nomeProf, email, sala};
    } else {
        addProf(codigo, nomeProf, email, sala);
    }
    
    closeModal("profModal");
    renderProfs();
});

renderProfs();