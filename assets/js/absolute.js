document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#repertoire-body");
  
  if (!tableBody) return;

  const absolute = await fetch("absolute.json").then(r => r.json());

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
        <td class="instrumentation-cell">${entry.instrumentation || '-'}</td>
        <td class="type-cell">${entry.composition_type || '-'}</td>
        <td class="premiere-cell">${premiereDate}</td>
      </tr>
    `;
  }

  tableBody.innerHTML = absolute.map(createRow).join("");

  const table = $('#sortTable').DataTable({
    language: window.currentTexts || {},
    lengthMenu: [[25, 50, 100, 200], [25, 50, 100, 200]],
    pageLength: 25,
    columnDefs: [
      { orderable: true, targets: [0, 3] },
      { orderable: false, targets: [1, 2] }
    ]
  });

  // FIX: Sostituisci il testo Previous/Next con chevron
  setTimeout(() => {
    document.querySelectorAll('.paginate_button.previous').forEach(btn => {
      btn.textContent = '‹';
    });
    document.querySelectorAll('.paginate_button.next').forEach(btn => {
      btn.textContent = '›';
    });
  }, 100);
});

