const ensureCanvas = () => {
	const existing = document.getElementById('canvas');
	if (existing) {
		return existing;
	}
	const fresh = document.createElement('canvas');
	fresh.id = 'canvas';
	fresh.setAttribute('aria-hidden', 'true');
	document.body.prepend(fresh);
	return fresh;
};

const canvas = ensureCanvas();
const ctx = canvas.getContext('2d');
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const mouse = { x: width / 2, y: height / 2 };

window.addEventListener('mousemove', (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	initParticles();
});

class Particle {
	constructor() {
		this.x = Math.random() * width;
		this.y = Math.random() * height;
		this.radius = 2;
		this.vx = (Math.random() - 0.5) * 0.5;
		this.vy = (Math.random() - 0.5) * 0.5;
	}

	move() {
		this.x += this.vx;
		this.y += this.vy;
		if (this.x < 0 || this.x > width) this.vx *= -1;
		if (this.y < 0 || this.y > height) this.vy *= -1;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = '#000';
		ctx.fill();
	}
}

let particlesArray = [];
const PARTICLE_COUNT = 200;

function initParticles() {
	particlesArray = [];
	for (let i = 0; i < PARTICLE_COUNT; i++) {
		particlesArray.push(new Particle());
	}
}

function connectParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		for (let j = i + 1; j < particlesArray.length; j++) {
			let dx = particlesArray[i].x - particlesArray[j].x;
			let dy = particlesArray[i].y - particlesArray[j].y;
			let distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < 100) {
				ctx.beginPath();
				ctx.strokeStyle = `rgba(255,255,255,${1 - distance / 100})`;
				ctx.lineWidth = 1;
				ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
				ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
				ctx.stroke();
			}
		}

		let dx = particlesArray[i].x - mouse.x;
		let dy = particlesArray[i].y - mouse.y;
		let distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < 150) {
			ctx.beginPath();
			ctx.strokeStyle = `rgba(255,255,255,${1 - distance / 150})`;
			ctx.lineWidth = 1;
			ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, width, height);
	particlesArray.forEach((p) => {
		p.move();
		p.draw();
	});
	connectParticles();
	requestAnimationFrame(animate);
}

initParticles();
animate();
