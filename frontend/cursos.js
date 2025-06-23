let cursos = [];
let currentCursoId = null;

//Modal Handling
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Event listener for the "Add Curso" button
const btAddCurso = document.getElementById("addCurso");
btAddCurso.addEventListener("click", function () {
    currentCursoId = null;
    document.getElementById("cursoForm").reset();
    document.getElementById('cursoId').value = '';
    openModal("cursoModal");
});

// Event listeners for all close buttons
document.querySelectorAll(".close").forEach(function (closeBt) {
    closeBt.addEventListener("click", function () {
        const modal = closeBt.closest('.modal');
        closeModal(modal.id);
    });
});

//Data Render
function renderCursos() {
    const tbody = document.querySelector('#cursosTable tbody');
    tbody.innerHTML = '';
    fetch('http://localhost:3000/cursos')
        .then(response => response.json())
        .then(data => {
            cursos = data;
            cursos.forEach((curso, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${curso.nome}</td>
                    <td>${curso.sigla || ''}</td>
                    <td>${curso.descricao || ''}</td>
                    <td>${curso.nome_coordenador || 'N/A'}</td>
                    <td>
                        <button onclick="editCurso(${index})">Editar</button>
                        <button onclick="deleteCurso(${index})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
}

//CRUD
function editCurso(index) {
    const curso = cursos[index];
    document.getElementById('cursoId').value = curso.id;
    document.getElementById('nome').value = curso.nome;
    document.getElementById('sigla').value = curso.sigla;
    document.getElementById('descricao').value = curso.descricao;
    document.getElementById('id_coordenador').value = curso.id_coordenador;
    
    currentCursoId = curso.id;
    openModal("cursoModal");
}

function deleteCurso(index) {
    const curso = cursos[index];
    const cursoId = curso.id;

    if (confirm(`Tem certeza que deseja excluir o curso ${curso.nome}?`)) {
        fetch(`http://localhost:3000/cursos/${cursoId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) { throw new Error('Failed to delete curso'); }
            renderCursos();
        })
        .catch(error => console.error('Error deleting curso:', error));
    }
}

function addCurso(cursoData) {
    return fetch('http://localhost:3000/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cursoData)
    }).then(response => response.json());
}

function updateCurso(id, cursoData) {
    return fetch(`http://localhost:3000/cursos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cursoData)
    }).then(response => response.json());
}

//Form Submit
const cursoForm = document.getElementById("cursoForm");
cursoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const sigla = document.getElementById('sigla').value;
    const descricao = document.getElementById('descricao').value;
    const id_coordenador = document.getElementById('id_coordenador').value;

    const cursoData = { 
        nome, 
        sigla, 
        descricao, 
        id_coordenador: id_coordenador ? parseInt(id_coordenador, 10) : null 
    };

    console.log("Sending data:", cursoData);

    let promise;
    if (currentCursoId) {
        promise = updateCurso(currentCursoId, cursoData);
    } else {
        promise = addCurso(cursoData);
    }

    promise.then(() => {
        closeModal("cursoModal");
        currentCursoId = null;
        renderCursos();
    }).catch(error => {
        console.error('Submit failed:', error);
        alert('Falha ao salvar o curso.');
    });
});

// Initial render
renderCursos();