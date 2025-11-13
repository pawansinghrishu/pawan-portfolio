/* Projects data (from your resume) */
const projects = [
  {
    id: 'myntra',
    title: 'Scouting Myntra App — DevSecOps CI/CD Pipeline',
    overview: 'Created a CI/CD pipeline for a Myntra-like e-commerce app using GitHub Actions and integrated security scanning.',
    bullets: [
      'Built automated workflows using GitHub Actions for CI/CD.',
      'Used Trivy & Docker Scout to scan images for vulnerabilities.',
      'Integrated SonarQube for code quality gates.',
      'Deployed on AWS EKS using Helm and Kubernetes.'
    ],
    tech: ['GitHub Actions','Docker','Trivy','Docker Scout','SonarQube','Kubernetes (EKS)','AWS'],
    repo:'#'
  },
  {
    id:'hotstar',
    title: 'Secure Hotstar Clone — DevSecOps Pipeline',
    overview: 'CI/CD pipeline for a Hotstar-like streaming app focusing on automation + security using Jenkins and Docker.',
    bullets:[
      'Designed Jenkins pipelines to automate build & deployment.',
      'Containerized apps using Docker and scanned images with Trivy.',
      'Used SonarQube for code quality checks.',
      'Deployed to AWS EC2 with Kubernetes orchestration.'
    ],
    tech: ['Jenkins','Docker','Trivy','SonarQube','Kubernetes','AWS EC2','GitHub'],
    repo:'#'
  },
  {
    id:'netflix',
    title:'Netflix Clone — Cloud Monitoring Project',
    overview:'Deployed a Netflix-like app on AWS and added Prometheus & Grafana monitoring for performance insights.',
    bullets:[
      'Deployed containers with Docker & managed via Kubernetes.',
      'Configured Prometheus & Grafana dashboards for real-time metrics.',
      'Automated deployments using Jenkins.',
      'Configured Nginx for load balancing and routing.'
    ],
    tech:['Docker','Kubernetes','Prometheus','Grafana','Jenkins','AWS','Nginx'],
    repo:'#'
  },
  {
    id:'devsecops',
    title:'DevSecOps Platform — Security-first Pipeline',
    overview:'End-to-end DevSecOps platform integrating static/dynamic checks in CI, container scanning and policy enforcement.',
    bullets:[
      'Implemented SAST/DAST & image scanning into CI workflows.',
      'Automated policy enforcement with scan gating.',
      'Integrated monitoring & alerting into deployment pipelines.',
      'Improved deployment safety while reducing manual checks.'
    ],
    tech:['CI/CD','Trivy','SonarQube','Policy as Code','Monitoring','Kubernetes','AWS'],
    repo:'#'
  }
];

/* render slides */
const slidesWrap = document.getElementById('slides');
function createCard(p){
  const el = document.createElement('article');
  el.className = 'card';
  el.tabIndex = 0;
  el.setAttribute('role','button');
  el.innerHTML = `<h3>${p.title}</h3><p>${p.overview}</p>`;
  el.addEventListener('click', ()=> openModal(p.id));
  el.addEventListener('pointermove', (e)=>{
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    el.style.transform = `perspective(900px) translateY(-6px) rotateX(${-y*6}deg) rotateY(${x*10}deg)`;
  });
  el.addEventListener('pointerleave', ()=> el.style.transform='perspective(900px) translateY(0) rotateX(0) rotateY(0)');
  return el;
}
projects.forEach(p => slidesWrap.appendChild(createCard(p)));

/* slider controls + autoplay */
let slideIndex = 0;
const prevBtn = document.getElementById('prev'), nextBtn = document.getElementById('next');
const slideWidth = () => slidesWrap.querySelector('.card').getBoundingClientRect().width + 18;
function goTo(idx){
  slideIndex = idx;
  if(slideIndex < 0) slideIndex = 0;
  if(slideIndex > projects.length-1) slideIndex = projects.length-1;
  slidesWrap.scrollTo({ left: slideIndex * slideWidth(), behavior:'smooth' });
}
prevBtn.addEventListener('click', ()=> goTo(slideIndex-1));
nextBtn.addEventListener('click', ()=> goTo(slideIndex+1));
let autoplay = true;
let autoTimer = setInterval(()=> {
  if(!autoplay) return;
  slideIndex = (slideIndex + 1) % projects.length;
  goTo(slideIndex);
}, 3500);
slidesWrap.addEventListener('pointerdown', ()=> autoplay=false);
slidesWrap.addEventListener('pointerup', ()=> autoplay=true);
let touchStartX = 0;
slidesWrap.addEventListener('touchstart', (e)=> touchStartX = e.touches[0].clientX);
slidesWrap.addEventListener('touchend', (e)=>{
  const diff = e.changedTouches[0].clientX - touchStartX;
  if(Math.abs(diff) > 40){
    if(diff < 0) goTo(slideIndex+1); else goTo(slideIndex-1);
  }
});

/* modal logic */
const modalBackdrop = document.getElementById('modalBackdrop');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalOverview = document.getElementById('modalOverview');
const modalBullets = document.getElementById('modalBullets');
const modalTech = document.getElementById('modalTech');
const modalRepo = document.getElementById('modalRepo');
const closeBtn = document.getElementById('closeModal');
const modalClose = document.getElementById('modalClose');
const modalResumeBtn = document.getElementById('downloadModalResume');
function openModal(id){
  const p = projects.find(x=>x.id===id);
  modalTitle.textContent = p.title;
  modalOverview.textContent = p.overview;
  modalBullets.innerHTML = '';
  p.bullets.forEach(b=>{ const li=document.createElement('li'); li.textContent=b; modalBullets.appendChild(li); });
  modalTech.innerHTML = '';
  p.tech.forEach(t=>{ const ch=document.createElement('span'); ch.className='chip'; ch.textContent=t; modalTech.appendChild(ch); });
  modalRepo.href = p.repo || '#';
  modalBackdrop.style.display = 'flex';
  setTimeout(()=> modal.classList.add('open'), 20);
  modalBackdrop.setAttribute('aria-hidden','false');
}
function closeModal(){ modal.classList.remove('open'); setTimeout(()=> { modalBackdrop.style.display='none'; modalBackdrop.setAttribute('aria-hidden','true'); }, 240); }
closeBtn.addEventListener('click', closeModal); modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click',(e)=> { if(e.target === modalBackdrop) closeModal(); });
document.addEventListener('keydown',(e)=> { if(e.key === 'Escape') closeModal(); });
modalResumeBtn.addEventListener('click', ()=> window.open('resume.pdf','_blank'));

/* theme toggle */
const themeBtn = document.getElementById('themeToggle');
function setTheme(t){ document.documentElement.setAttribute('data-theme', t); themeBtn.textContent = (t==='dark'? '🌙' : '☀️'); localStorage.setItem('theme', t); }
themeBtn.addEventListener('click', ()=> { const cur = document.documentElement.getAttribute('data-theme') || 'dark'; setTheme(cur === 'dark' ? 'light' : 'dark'); });
const saved = localStorage.getItem('theme') || 'dark'; setTheme(saved);

/* avatar tilt */
const avatarWrap = document.getElementById('avatarWrap');
avatarWrap.addEventListener('pointermove', (e)=>{ const r = avatarWrap.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-0.5; const y=(e.clientY-r.top)/r.height-0.5; avatarWrap.style.transform = `translateZ(0) rotateX(${-y*6}deg) rotateY(${x*10}deg)`; });
avatarWrap.addEventListener('pointerleave', ()=> avatarWrap.style.transform='translateZ(0)');

/* contact button scroll */
document.getElementById('contactBtn').addEventListener('click', ()=> document.getElementById('contactCard').scrollIntoView({behavior:'smooth'}));