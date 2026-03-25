const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const eventsDir = path.join(__dirname, 'events');
const outputFile = path.join(__dirname, 'events.json');
const events = [];

// Legge tutti i file .md nella cartella events/
fs.readdirSync(eventsDir).forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(eventsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    events.push({
      date: data.date || '',
      title: data.title || '',
      venue: data.venue || '',
      performers: data.performers || '',
      url: data.url || ''
    });
  }
});

// Ordina per data crescente
events.sort((a, b) => new Date(a.date) - new Date(b.date));

// Scrive il JSON
fs.writeFileSync(outputFile, JSON.stringify(events, null, 2));
console.log(`Events JSON generato in ${outputFile}`);