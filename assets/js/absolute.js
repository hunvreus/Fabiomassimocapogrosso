document.addEventListener("DOMContentLoaded", async () => {
  if (!window.location.pathname.endsWith("absolute.html")) return;

  const tableBody = document.querySelector("#absoluteTable tbody");

  // 1. Carico JSON
  const absolute = await fetch("absolute.json").then(r => r.json());

  // 2. Funzione per creare righe della tabella
  function createRow(entry) {
    const premiereDate = entry.premiere_date 
      ? new Date(entry.premiere_date).toLocaleDateString('it-IT', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : '-';

    return `
      <tr>
        <td class="name-cell">${entry.name}</td>
        <td class="type-cell">${entry.composition_type || '-'}</td>
        <td class="instrumentation-cell">${entry.instrumentation || '-'}</td>
        <td class="premiere-cell">${premiereDate}</td>
      </tr>
    `;
  }

  // 3. Popola la tabella
  tableBody.innerHTML = absolute.map(createRow).join("");

  // 4. Inizializza DataTable
  const table = $('#absoluteTable').DataTable({
    language: window.currentTexts || {},
    lengthMenu: [[25, 50, 100, 200], [25, 50, 100, 200]],
    pageLength: 25,
    columnDefs: [
      { orderable: true, targets: [0, 1, 3] },
      { orderable: false, targets: [2] }
    ]
  });
});