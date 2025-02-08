document.getElementById("date").textContent = new Date().getFullYear();

VANTA.NET({
  el: "#background",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x40cf8e,
  backgroundColor: 0x131313,
  points: 20.0,
  maxDistance: 15.0,
  spacing: 25.0,
  showDots: false,
});
