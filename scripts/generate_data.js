const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

// Arrays for randomization
const categories = ['Web Development', 'Mobile Development', 'Data Science', 'Programming', 'DevOps', 'Security', 'Design', 'Business', 'Marketing', 'Game Development'];
const difficulties = ['easy', 'medium', 'hard'];
const problemCategories = ['Array', 'String', 'Linked List', 'Tree', 'Graph', 'Dynamic Programming', 'Backtracking', 'Sorting', 'Searching', 'Greedy'];

// Unsplash Image Map for better visual quality
const categoryImages = {
    'Web Development': [
        'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400',
        'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400'
    ],
    'Mobile Development': [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400',
        'https://images.unsplash.com/photo-1599507593362-50fa53ed1b40?w=400',
        'https://images.unsplash.com/photo-1537884944318-390069bb8665?w=400'
    ],
    'Data Science': [
        'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=400',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400',
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400',
        'https://images.unsplash.com/photo-1535378437327-10eff3c57fd4?w=400'
    ],
    'Programming': [
        'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
        'https://images.unsplash.com/photo-1624969862293-b749659ccc4e?w=400'
    ],
    'Security': [
        'https://images.unsplash.com/photo-1563206767-5b1d972b9fb6?w=400',
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'
    ],
    'DevOps': [
        'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400',
        'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400'
    ],
    'Design': [
        'https://images.unsplash.com/photo-1558655146-d09347e0b7a8?w=400',
        'https://images.unsplash.com/photo-1626785774573-4b7993125651?w=400',
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400'
    ],
    'Business': [
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400'
    ],
    'Marketing': [
        'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400',
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400'
    ],
    'Game Development': [
        'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400',
        'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400'
    ]
};

function getRandomImage(category) {
    const images = categoryImages[category] || categoryImages['Programming'];
    return images[Math.floor(Math.random() * images.length)];
}

const generateCourses = (count) => {
    const courses = [];
    for (let i = 1; i <= count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        courses.push({
            id: i.toString(),
            title: `${category} Masterclass ${i}`,
            description: `Learn everything about ${category} in this comprehensive course number ${i}.`,
            instructor: `instructor${(i % 20) + 1}`,
            instructorName: `Instructor ${i}`,
            price: [19.99, 29.99, 49.99, 89.99, 99.99][Math.floor(Math.random() * 5)],
            rating: parseFloat((4 + Math.random()).toFixed(1)),
            students: Math.floor(Math.random() * 20000) + 100,
            category: category,
            thumbnail: getRandomImage(category),
            createdAt: new Date().toISOString(),
            videoReviewUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
            lessons: [
                { id: `${i}-1`, title: "Introduction", duration: 1200, description: "Intro to the course", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
                { id: `${i}-2`, title: "Deep Dive", duration: 1800, description: "Advanced concepts", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
            ]
        });
    }
    return courses;
};

const generateProblems = (count) => {
    const problems = [];
    for (let i = 1; i <= count; i++) {
        const diff = difficulties[Math.floor(Math.random() * difficulties.length)];
        const cat = problemCategories[Math.floor(Math.random() * problemCategories.length)];
        problems.push({
            id: i.toString(),
            title: `${cat} Problem ${i}`,
            description: `Solve this challenging ${diff} problem about ${cat}.`,
            difficulty: diff,
            category: cat,
            acceptance: Math.floor(Math.random() * 60) + 20,
            submissions: Math.floor(Math.random() * 100000),
            testCases: [],
            starterCode: {
                javascript: `// Solution for problem ${i}\nfunction solve() {\n  \n}`,
                python: `# Solution for problem ${i}\ndef solve():\n  pass`
            },
            solution: `Solution technique for ${cat}`
        });
    }
    return problems;
};

// Main execution
try {
    let data = { users: [], courses: [], problems: [], submissions: [] };

    // Attempt to read existing user data to preserve it
    if (fs.existsSync(dbPath)) {
        const existingData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        if (existingData.users) data.users = existingData.users;
        if (existingData.submissions) data.submissions = existingData.submissions;
    }

    // Generate new content
    data.courses = generateCourses(100);
    data.problems = generateProblems(100);

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    console.log('Successfully generated 100 courses and 100 problems.');
} catch (error) {
    console.error('Error generating data:', error);
}
