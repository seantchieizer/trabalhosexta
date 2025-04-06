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
