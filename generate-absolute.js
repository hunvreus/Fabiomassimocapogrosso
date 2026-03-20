const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const absoluteDir = path.join(__dirname, 'absolute');
const outputFile = path.join(__dirname, 'absolute.json');
const absolute = [];

// Legge tutti i file .md nella cartella absolute/
fs.readdirSync(absoluteDir).forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(absoluteDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);

    absolute.push({
      name: data.name || '',
      instrumentation: data.instrumentation || '',
      composition_type: data.composition_type || '',
      premiere_date: data.premiere_date || '',
      url: data.url || ''
    });
  }
});

// Ordina per data di prima esecuzione decrescente (più recenti prima)
absolute.sort((a, b) => new Date(b.premiere_date) - new Date(a.premiere_date));

// Scrive il JSON
fs.writeFileSync(outputFile, JSON.stringify(absolute, null, 2));
console.log(`Absolute JSON generato in ${outputFile}`);