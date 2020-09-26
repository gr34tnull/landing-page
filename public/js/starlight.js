var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particleCount = 831;
var mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2 
};

window.addEventListener("mousemove", function(event) {
  mouse.x = event.clientX - canvas.width / 2;
  mouse.y = event.clientY - canvas.height / 2;
});

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth; 
  canvas.height = window.innerHeight;

  lightParticles = [];
  initializeParticles();
});


function LightParticle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.update = function() {
    this.draw();
  };

  this.draw = function() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);  
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };
}

var lightParticles = [];

var timer = 0;
var opacity = 1;
var speed = 0.0005;
var colors = [
"#8C035C","#F241D5","#023E73","#0AADBF","#0D0D0D","#FFFEFF","#A29C95","#BE9448","#626062","#D3D1D5"
];

var initializeParticles;

(initializeParticles = function() {
  for (var i = 0; i < particleCount; i++) {

    var randomColorIndex = Math.floor(Math.random() * 6);
    var randomRadius = Math.random() * 2;

// Ensure particles are spawned past screen width and height so
// there will be no missing stars when rotating canvas
var x = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;
var y = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;
lightParticles.push(new LightParticle(x, y, randomRadius, colors[randomColorIndex]));
}
})();

function animate() {
  window.requestAnimationFrame(animate);

  ctx.save();
  if (isMouseDown === true) {

// Ease into the new opacity
var desiredOpacity = 0.01;
opacity += (desiredOpacity - opacity) * 0.03;
ctx.fillStyle = "rgba(244, 244, 229,"+ opacity +")";
// ctx.fillStyle = "rgba(16, 16, 16,"+ opacity +")";

// Ease into the new speed
var desiredSpeed = 0.034;
speed += (desiredSpeed - speed) * 0.012;
timer += speed;

} else {

// Ease back to the original opacity
var originalOpacity = 1;
opacity += (originalOpacity - opacity) * 0.01;
ctx.fillStyle = "rgba(244, 244, 229," + opacity + ")";
// ctx.fillStyle = "rgba(16, 16, 16,"+ opacity +")";

// Ease back to the original speed
var originalSpeed = 0.001;
speed += (originalSpeed - speed) * 0.01;
timer += speed;
}

ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.translate(canvas.width / 2, canvas.height/2 );
ctx.rotate(timer);

for (var i = 0; i < lightParticles.length; i++) {
  lightParticles[i].update();
}
ctx.restore();
}

var isMouseDown = false;

window.addEventListener("mousedown", function() {
  isMouseDown = true; 
});


window.addEventListener("mouseup", function() {
  isMouseDown = false;  
});

animate();