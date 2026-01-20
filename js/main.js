// Shortcut click
document.querySelectorAll('.shortcut').forEach(sc => {
  sc.addEventListener('click', () => {
    window.open(sc.dataset.link, '_blank');
  });
});

// Games card click
document.querySelectorAll('.game-card').forEach(gc => {
  gc.addEventListener('click', () => {
    window.open(gc.dataset.link, '_blank');
  });
});

// Tabs system
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// Confetti (party effect)
const confettiCanvas = document.getElementById('confetti');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
const ctx = confettiCanvas.getContext('2d');
let confettis = [];
function createConfetti(){
  for(let i=0;i<100;i++){
    confettis.push({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: Math.random()*6+2,
      d: Math.random()*50+5,
      color: `hsl(${Math.random()*360},100%,50%)`,
      tilt: Math.random()*10-10
    });
  }
}
function drawConfetti(){
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  confettis.forEach(c=>{
    ctx.beginPath();
    ctx.lineWidth = c.r;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r/2, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.d);
    ctx.stroke();
    c.y += 2;
    if(c.y>window.innerHeight){ c.y=0; c.x=Math.random()*window.innerWidth;}
  });
  requestAnimationFrame(drawConfetti);
}
createConfetti(); drawConfetti();
