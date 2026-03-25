const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const biographyFile = path.join(__dirname, 'biography');
const outputFile = path.join(__dirname, 'biography.json');

const content = fs.readFileSync(biographyFile, 'utf8');
const { data } = matter(content);

const fixPath = (p) => (typeof p === 'string' ? p.replace(/^\//, '') : p);

const biography = {
  title1: data.title1 || '',
  subtitle1: data.subtitle1 || '',
  img1: fixPath(data.img1 || ''),
  title2: data.title2 || '',
  subtitle2: data.subtitle2 || '',
  img2: fixPath(data.img2 || ''),
};

fs.writeFileSync(outputFile, JSON.stringify(biography, null, 2));

console.log(`Biography JSON generato in ${outputFile}`);