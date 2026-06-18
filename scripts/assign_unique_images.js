const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log(`Updating ${db.courses.length} courses with STRICT coding images...`);

// Strict keywords to ensure only coding content
const keywordGroups = [
    'coding,monitor',
    'source-code,screen',
    'developer,keyboard',
    'programming,terminal',
    'javascript,code',
    'python,code',
    'html,css,screen',
    'ide,software',
    'hacker,terminal',
    'code,laptop'
];

db.courses.forEach((course, index) => {
    // Rotate through keyword groups to ensure variety but strict relevance
    const keywords = keywordGroups[index % keywordGroups.length];

    // Unique lock ensures no duplicates
    course.thumbnail = `https://loremflickr.com/400/200/${keywords}?lock=${course.id}`;
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log('All courses updated with strict coding-related unique images.');
