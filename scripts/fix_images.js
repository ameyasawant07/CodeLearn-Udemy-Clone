const fs = require('fs');
const https = require('https');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const uniqueUrls = [...new Set(db.courses.map(c => c.thumbnail))];
console.log(`Checking ${uniqueUrls.length} unique URLs...`);

let badUrls = [];

function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                console.log(`Bad URL (${res.statusCode}): ${url}`);
                badUrls.push(url);
            }
            resolve();
        }).on('error', (e) => {
            console.log(`Error checking ${url}: ${e.message}`);
            badUrls.push(url);
            resolve();
        });
    });
}

(async () => {
    for (const url of uniqueUrls) {
        await checkUrl(url);
    }

    if (badUrls.length > 0) {
        console.log('Bad URLs found:', badUrls);
    } else {
        console.log('All URLs seem accessible.');
    }

    // If bad URLs exist, replace them with a fallback
    if (badUrls.length > 0) {
        console.log('Fixing bad URLs...');
        const fallback = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400'; // Reliable coding image

        db.courses.forEach(c => {
            if (badUrls.includes(c.thumbnail)) {
                c.thumbnail = fallback;
            }
        });

        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        console.log('Database updated with fixed images.');
    }
})();
