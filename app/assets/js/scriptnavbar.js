document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar-container');
  
    fetch('component/navbar.html')
      .then(response => response.text())
      .then(data => {
        navbarContainer.innerHTML = data;
      })
      .catch(error => console.error('Erro ao carregar navbar:', error));
  });
  