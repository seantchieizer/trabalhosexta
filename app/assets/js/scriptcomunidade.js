const jobs = [];
const jobList = document.getElementById('job-list');
const postForm = document.getElementById('post-job-form');
const searchInput = document.getElementById('search-title');

function displayJobs(jobsToDisplay) {
  jobList.innerHTML = '';
  jobsToDisplay.forEach((job, index) => {
    const card = document.createElement('div');
    card.classList.add('job-card');

    const titleEl = document.createElement('h3');
    titleEl.textContent = job.title;
    card.appendChild(titleEl);

    const descEl = document.createElement('p');
    descEl.textContent = job.description;
    card.appendChild(descEl);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.classList.add('btn-remove');
    removeBtn.addEventListener('click', () => {
      jobs.splice(index, 1);
      displayJobs(jobs);
    });
    card.appendChild(removeBtn);

    jobList.appendChild(card);
  });
}

postForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const title = document.getElementById('job-title').value.trim();
  const description = document.getElementById('job-desc').value.trim();

  if (title === '' || description === '') {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  jobs.push({ title, description });
  displayJobs(jobs);
  postForm.reset();
});

searchInput.addEventListener('input', function() {
  const query = searchInput.value.trim().toLowerCase();
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(query)
  );
  displayJobs(filteredJobs);
});

displayJobs(jobs);
