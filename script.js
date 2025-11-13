// set year
document.getElementById('year').textContent = new Date().getFullYear();
// slider
let idx=0; const slider=document.getElementById('reviewSlider'); const slides=document.querySelectorAll('.slide');
function show(i){ idx=(i+slides.length)%slides.length; slider.style.transform = `translateX(${ -idx * (slides[0].offsetWidth + 16)}px)`; }
document.getElementById('nextBtn')?.addEventListener('click', ()=> show(idx+1));
document.getElementById('prevBtn')?.addEventListener('click', ()=> show(idx-1));
let auto=setInterval(()=> show(idx+1),4000);
// tilt
document.querySelectorAll('.tilt').forEach(card=>{ card.addEventListener('mousemove', e=>{ const r=card.getBoundingClientRect(); const x=e.clientX-r.left; const y=e.clientY-r.top; const cx=r.width/2, cy=r.height/2; const rx=((y-cy)/cy)*8; const ry=((x-cx)/cx)*-8; card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`; }); card.addEventListener('mouseleave', ()=> card.style.transform=''); });