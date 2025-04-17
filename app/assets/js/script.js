document.addEventListener("DOMContentLoaded", () => {
    const postarBtn = document.getElementById("postarVaga");
    const vagaInput = document.getElementById("vagaInput");
    const forum = document.getElementById("forum");

    postarBtn.addEventListener("click", () => {
        const vagaTexto = vagaInput.value.trim();

        if (vagaTexto !== "") {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");
            postDiv.innerHTML = `<p>${vagaTexto}</p>`;
            forum.prepend(postDiv); 

            vagaInput.value = ""; 
        } else {
            alert("Digite uma vaga antes de postar.");
        }
    });
});

function toggleContent(id) {
    let content = document.getElementById(id);
    const allContents = document.querySelectorAll('.conteudo p');
    
    // Esconde todos os outros conteúdos
    allContents.forEach((item) => {
        if (item !== content) {
            item.classList.add('hidden');
        }
    });
    
    // Alterna a visibilidade do conteúdo clicado
    content.classList.toggle('hidden');
}

const jobForm = document.getElementById('jobForm');
const jobsContainer = document.getElementById('jobs');
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');

jobForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const jobDiv = document.createElement('div');
    jobDiv.classList.add('post');
    jobDiv.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    jobsContainer.appendChild(jobDiv);

    jobForm.reset();
});

searchButton.addEventListener('click', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const jobs = document.querySelectorAll('.post');
    jobs.forEach(job => {
        const title = job.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            job.style.display = '';
        } else {
            job.style.display = 'none';
        }
    });
});