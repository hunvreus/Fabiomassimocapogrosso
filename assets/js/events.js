document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("speakers");
  const MAX_EVENTS = 10;

  fetch("/events.json")
    .then(res => res.json())
    .then(data => {
      // Ordina per data crescente (prossimi eventi prima)
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      
      data.slice(0, MAX_EVENTS).forEach(event => {
        // Formatta la data (es: "07 Feb")
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short'
        });

        const row = document.createElement("div");
        row.className = "row event";
        
        row.innerHTML = `
          <div class="col-sm-2">
            <h2>${formattedDate}</h2>
          </div>
          <div class="col-sm-2">
            <h3>${event.title}</h3>
          </div>
          <div class="mobile-info">
            <div class="col place">
              <p>${event.venue}</p>
              <p>${event.performers}</p>
            </div>
            <div class="col info-div">
              ${event.url ? `
                <a href="${event.url}" target="_blank" class="info">
                  Info<i class="fa-solid fa-circle-arrow-right event-arrow"></i>
                </a>
              ` : `
                <span class="info">Info<i class="fa-solid fa-circle-arrow-right event-arrow"></i></span>
              `}
            </div>
          </div>
        `;
        
        container.appendChild(row);
      });
    })
    .catch(err => console.error("Errore caricando gli eventi:", err));
});