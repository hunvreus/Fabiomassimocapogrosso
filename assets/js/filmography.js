document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("about-container");

  fetch("/filmography.json")
    .then(res => res.json())
    .then(data => {
      // Ordina per anno decrescente (film più recenti prima)
      data.sort((a, b) => b.year - a.year);

      data.forEach(film => {
        const filmBox = document.createElement("div");
        filmBox.className = "film-box";
        filmBox.style.backgroundImage = `url('${film.poster}')`;
        filmBox.style.backgroundSize = "cover";
        filmBox.style.backgroundPosition = "center";

        filmBox.innerHTML = `
          <h2>${film.title}</h2>
          <h4>${film.director}</h4>
          <p>${film.year}</p>
        `;

        container.appendChild(filmBox);
      });
    })
    .catch(err => console.error("Errore caricando la filmografia:", err));
});