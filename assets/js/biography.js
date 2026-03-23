document.addEventListener("DOMContentLoaded", () => {
  fetch("/biography.json")
    .then(res => res.json())
    .then(data => {

      // Sezione 1
      document.getElementById("title1").textContent = data.title1;
      document.getElementById("subtitle1").textContent = data.subtitle1;
      document.getElementById("img1").src = data.img1;

      // Sezione 2
      document.getElementById("title2").textContent = data.title2;
      document.getElementById("subtitle2").textContent = data.subtitle2;
      document.getElementById("img2").src = data.img2;

    })
    .catch(err => console.error("Errore caricando la biografia:", err));
});