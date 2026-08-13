import fs from 'fs';

const data = JSON.parse(fs.readFileSync('xr-3054-details.json', 'utf8'));

console.log('=== SUMMARY ===');
console.log(data.fields.summary);

console.log('=== DESCRIPTION ===');
console.log(JSON.stringify(data.fields.description, null, 2));

console.log('=== CUSTOM FIELDS WITH VALUES ===');
for (const [key, val] of Object.entries(data.fields)) {
  if (val !== null && val !== undefined && key.startsWith('customfield_')) {
    console.log(`${key}:`, JSON.stringify(val).substring(0, 300));
  }
}

console.log('=== ISSUE LINKS ===');
console.log(JSON.stringify(data.fields.issuelinks, null, 2));
