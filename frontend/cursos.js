let cursos = [];
let currentCursoId = null;

function openModal(modalId){
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId){
    document.getElementById(modalId).style.display = "none";
}

const btAddCurso = document.getElementById("addCurso");
btAddCurso.addEventListener("click", function(){
    currentCursoId = null;
    document.getElementById("cursoForm").reset();
    openModal("cursoModal");
});

document.querySelectorAll(".close").forEach(function(closeBt){
    closeBt.addEventListener("click", function(){
        closeModal("cursoModal");
    });
});

//carrega os cursos como linhas da tabela
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
                    <td>${curso.coordenador}</td>
                    <td>
                        <button onclick="editCurso(${index})">Editar</button>
                        <button onclick="deleteCurso(${index})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
}

function editCurso(index) {
    const curso = cursos[index];
    document.getElementById('codigo').value = curso.codigo;
    document.getElementById('nomeCurso').value = curso.nomeCurso;
    document.getElementById('semestres').value = curso.semestres;
    document.getElementById('coordenador').value = curso.coordenador;
    currentCursoId = index;
    openModal("cursoModal");
}

function deleteCurso(index) {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
        cursos.splice(index, 1);
        renderCursos();
    }
}

function addCurso(codigo, nomeCurso, semestres, coordenador) {
    let curso = {codigo, nomeCurso, semestres, coordenador};
    console.log(curso);

    fetch('http://localhost:3000/cursos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({curso})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        renderCursos();
    });
}

const cursoForm = document.getElementById("cursoForm");
cursoForm.addEventListener("submit", function(event){
    event.preventDefault();
    const codigo = document.getElementById("codigo").value;
    const nomeCurso = document.getElementById("nomeCurso").value;
    const semestres = document.getElementById("semestres").value;
    const coordenador = document.getElementById("coordenador").value;

    if (currentCursoId !== null) {
        cursos[currentCursoId] = {codigo, nomeCurso, semestres, coordenador};
    } else {
        addCurso(codigo, nomeCurso, semestres, coordenador);
    }
    
    closeModal("cursoModal");
    renderCursos();
});

renderCursos();