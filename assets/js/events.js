document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#speakers .container");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  fetch("/events.json")
    .then(res => res.json())
    .then(data => {
      // Separa eventi futuri e passati
      const upcomingEvents = [];
      const pastEventsByYear = {};

      data.forEach(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        
        if (eventDate >= today) {
          upcomingEvents.push(event);
        } else {
          const year = eventDate.getFullYear();
          if (!pastEventsByYear[year]) {
            pastEventsByYear[year] = [];
          }
          pastEventsByYear[year].push(event);
        }
      });

      // Ordina eventi futuri per data crescente
      upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Ordina eventi passati per data decrescente (all'interno di ogni anno)
      Object.keys(pastEventsByYear).forEach(year => {
        pastEventsByYear[year].sort((a, b) => new Date(b.date) - new Date(a.date));
      });

      // Aggiungi eventi futuri
      if (upcomingEvents.length > 0) {
        const upcomingTitle = document.createElement("div");
        upcomingTitle.className = "container section-title";
        upcomingTitle.innerHTML = "<h2>Upcoming Events</h2>";
        container.appendChild(upcomingTitle);

        upcomingEvents.forEach(event => {
          container.appendChild(createEventRow(event));
        });
      }

      // Aggiungi eventi passati per anno (decrescente)
      const years = Object.keys(pastEventsByYear).sort().reverse();
      years.forEach(year => {
        const yearTitle = document.createElement("div");
        yearTitle.className = "container section-title";
        yearTitle.innerHTML = `<h2 class="event-year">${year}</h2>`;
        container.appendChild(yearTitle);

        pastEventsByYear[year].forEach(event => {
          container.appendChild(createEventRow(event));
        });
      });
    })
    .catch(err => console.error("Errore caricando gli eventi:", err));
});

function createEventRow(event) {
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
    <div class="col-sm-2 event-title">
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
  
  return row;
}