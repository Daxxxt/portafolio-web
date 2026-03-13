window.addEventListener('load', () => {

const canvas = document.getElementById("bannerCanvas");
const ctx = canvas.getContext("2d");
const header = canvas.parentElement;

canvas.width = header.offsetWidth;
canvas.height = header.offsetHeight;

const particles = [];
const mouse = { x: -1000, y: -1000, radius: 100 };

canvas.addEventListener("mousemove", (e) => {

const rect = canvas.getBoundingClientRect();
mouse.x = e.clientX - rect.left;
mouse.y = e.clientY - rect.top;

});

canvas.addEventListener("mouseleave", () => {

mouse.x = -1000;
mouse.y = -1000;

});

class Particle{

constructor(){

this.x = Math.random() * canvas.width;
this.y = Math.random() * canvas.height;

this.size = Math.random() * 5 + 1;

this.speedX = (Math.random() - 0.5) * 0.5;
this.speedY = (Math.random() - 0.5) * 0.5;

this.opacity = Math.random() * 0.5 + 0.2;

}

update(){

let dx = mouse.x - this.x;
let dy = mouse.y - this.y;

let distance = Math.sqrt(dx * dx + dy * dy);

if(distance < mouse.radius){

let force = (mouse.radius - distance) / mouse.radius;

let dirX = dx / distance;
let dirY = dy / distance;

this.x -= dirX * force * 5;
this.y -= dirY * force * 5;

}

this.x += this.speedX;
this.y += this.speedY;

if(this.x > canvas.width) this.x = 0;
if(this.x < 0) this.x = canvas.width;

if(this.y > canvas.height) this.y = 0;
if(this.y < 0) this.y = canvas.height;

}

draw(){

ctx.save();

ctx.globalAlpha = this.opacity;

ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);

ctx.fillStyle = "white";
ctx.fill();

ctx.restore();

}

}

for(let i = 0; i < 70; i++){

particles.push(new Particle());

}

function animate(){

ctx.fillStyle = "#000";
ctx.fillRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.update();
p.draw();
});

requestAnimationFrame(animate);

}

animate();

});