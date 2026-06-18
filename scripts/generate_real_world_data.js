const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 100 Real World Course Titles & Categories
const realWorldCourses = [
    { title: "The Complete Python Bootcamp 2024", category: "Programming" },
    { title: "Machine Learning A-Z: Hands-On Python & R", category: "Data Science" },
    { title: "The Web Developer Bootcamp 2024", category: "Web Development" },
    { title: "React - The Complete Guide (incl Hooks, React Router, Redux)", category: "Web Development" },
    { title: "Java Programming Masterclass covering Java 11 & Java 17", category: "Programming" },
    { title: "Angular - The Complete Guide (2024 Edition)", category: "Web Development" },
    { title: "iOS & Swift - The Complete iOS App Development Bootcamp", category: "Mobile Development" },
    { title: "The Complete JavaScript Course 2024: From Zero to Expert!", category: "Web Development" },
    { title: "Flutter & Dart - The Complete Guide [2024 Edition]", category: "Mobile Development" },
    { title: "The Data Science Course 2024: Complete Data Science Bootcamp", category: "Data Science" },
    { title: "Ultimate AWS Certified Solutions Architect Associate SAA-C03", category: "Cloud Computing" },
    { title: "Docker and Kubernetes: The Complete Guide", category: "DevOps" },
    { title: "Unreal Engine 5 C++ Developer: Learn C++ & Make Video Games", category: "Game Development" },
    { title: "The Complete 2024 Web Development Bootcamp", category: "Web Development" },
    { title: "Vue - The Complete Guide (incl. Router & Composition API)", category: "Web Development" },
    { title: "Clean Code", category: "Programming" },
    { title: "100 Days of Code: The Complete Python Pro Bootcamp for 2024", category: "Programming" },
    { title: "Learn Ethical Hacking From Scratch", category: "Security" },
    { title: "Modern HTML & CSS From The Beginning (Including Sass)", category: "Web Development" },
    { title: "Selenium WebDriver with Java - Basics to Advanced & Frameworks", category: "Testing" },
    { title: "Spring Boot 3, Spring 6 & Hibernate for Beginners", category: "Programming" },
    { title: "Go: The Complete Developer's Guide (Golang)", category: "Programming" },
    { title: "The Complete SQL Bootcamp 2024: Go from Zero to Hero", category: "Data Science" },
    { title: "Complete C# Unity Game Developer 2D", category: "Game Development" },
    { title: "Design Patterns in Java", category: "Programming" },
    { title: "Node.js, Express, MongoDB & More: The Complete Bootcamp 2024", category: "Web Development" },
    { title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!", category: "Web Development" },
    { title: "The Complete Cyber Security Course: Hackers Exposed!", category: "Security" },
    { title: "Mastering Data Structures & Algorithms using C++", category: "Computer Science" },
    { title: "Rust Programming: The Complete Developer's Guide", category: "Programming" },
    { title: "Kubernetes for the Absolute Beginners - Hands-on", category: "DevOps" },
    { title: "Ansible for the Absolute Beginner - Hands-On - DevOps", category: "DevOps" },
    { title: "Terraform for the Absolute Beginners with Labs", category: "DevOps" },
    { title: "Git Complete: The definitive, step-by-step guide to Git", category: "DevOps" },
    { title: "Jenkins, From Zero To Hero: Become a DevOps Jenkins Master", category: "DevOps" },
    { title: "Build Responsive Real-World Websites with HTML and CSS", category: "Web Development" },
    { title: "Next.js 14 & React - The Complete Guide", category: "Web Development" },
    { title: "Understanding TypeScript - 2024 Edition", category: "Web Development" },
    { title: "GraphQL with React: The Complete Developers Guide", category: "Web Development" },
    { title: "Comparison: React vs Angular vs Vue", category: "Web Development" },
    { title: "Adobe Photoshop CC - Essentials Training Course", category: "Design" },
    { title: "User Experience Design Essentials - Adobe XD UI UX Design", category: "Design" },
    { title: "Illustrator CC 2024 MasterClass", category: "Design" },
    { title: "Figma UI UX Design Essentials", category: "Design" },
    { title: "Complete Blender Creator: Learn 3D Modelling for Beginners", category: "Design" },
    { title: "Deep Learning A-Z: Hands-On Artificial Neural Networks", category: "Data Science" },
    { title: "Python for Data Science and Machine Learning Bootcamp", category: "Data Science" },
    { title: "R Programming A-Z: R For Data Science With Real Exercises!", category: "Data Science" },
    { title: "Artificial Intelligence A-Z 2024: Build an AI with ChatGPT4", category: "Data Science" },
    { title: "Tableau 2024 A-Z: Hands-On Tableau Training for Data Science", category: "Data Science" },
    { title: "Microsoft Power BI Desktop for Business Intelligence", category: "Data Science" },
    { title: "Android App Development Masterclass using Kotlin", category: "Mobile Development" },
    { title: "React Native - The Practical Guide [2024]", category: "Mobile Development" },
    { title: "SwiftUI Masterclass 2024 - iOS 17 App Development", category: "Mobile Development" },
    { title: "Unity 2D Game Kit: Create a 2D Game with Unity", category: "Game Development" },
    { title: "C++: From Beginner to Expert", category: "Programming" },
    { title: "C Programming For Beginners - Master the C Language", category: "Programming" },
    { title: "Embedded Systems Programming on ARM Cortex-M3/M4 Processor", category: "Programming" },
    { title: "Master Microservices with Spring Boot and Spring Cloud", category: "Programming" },
    { title: "Apache Kafka for Beginners - Learn Kafka by Hands-On", category: "Data Science" },
    { title: "Elasticsearch 8 and the Elastic Stack - In Depth and Hands On!", category: "Data Science" },
    { title: "PySpark - The Comprehensive Guide to Apache Spark", category: "Data Science" },
    { title: "Complete Linux Training Course to Get Your Dream IT Job", category: "DevOps" },
    { title: "Linux Command Line Basics", category: "DevOps" },
    { title: "Bash Scripting and Shell Programming (Linux Command Line)", category: "DevOps" },
    { title: "Network Hacking Continued - Intermediate to Advanced", category: "Security" },
    { title: "Website Hacking / Penetration Testing & Bug Bounty Hunting", category: "Security" },
    { title: "Wireshark: Packet Analysis and Wireshark: The Complete Guide", category: "Security" },
    { title: "Information Security Management Fundamentals for Non-Techies", category: "Security" },
    { title: "CompTIA Security+ (SY0-701) Complete Course & Exam", category: "Security" },
    { title: "Certified Blockchain Expert", category: "Blockchain" },
    { title: "Ethereum and Solidity: The Complete Developer's Guide", category: "Blockchain" },
    { title: "Solidity & Ethereum with React and Next!", category: "Blockchain" },
    { title: "Mastering Bitcoin", category: "Blockchain" },
    { title: "NFT Fundamentals", category: "Blockchain" },
    { title: "Digital Marketing Masterclass - 23 Courses in 1", category: "Marketing" },
    { title: "Instagram Marketing 2024: Complete Guide To Instagram Growth", category: "Marketing" },
    { title: "Social Media Marketing Agency: Digital Marketing + Business", category: "Marketing" },
    { title: "Google Ads (AdWords) Certification - Become a Google Ad Expert", category: "Marketing" },
    { title: "SEO 2024: Complete SEO Training + SEO for WordPress Websites", category: "Marketing" },
    { title: "Copywriting - Become a Freelance Copywriter", category: "Marketing" },
    { title: "YouTube Masterclass - Your Complete Guide to YouTube", category: "Marketing" },
    { title: "Premiere Pro CC for Beginners: Video Editing in Premiere", category: "Design" },
    { title: "After Effects CC: The Complete Motion Graphics Masterclass", category: "Design" },
    { title: "DaVinci Resolve 2024 - The Complete Video Editing Course", category: "Design" },
    { title: "Final Cut Pro X - Video Editing Mastery", category: "Design" },
    { title: "Logic Pro X - Music Production for Beginners", category: "Music" },
    { title: "FL Studio 21 - Music Production In FL Studio for Mac & PC", category: "Music" },
    { title: "Ableton Live 11 - Music Production in Ableton Live", category: "Music" },
    { title: "Music Theory for Electronic Music Producers", category: "Music" },
    { title: "Pianoforall - Incredible New Way To Learn Piano & Keyboard", category: "Music" },
    { title: "Guitar for Beginners", category: "Music" },
    { title: "Singing Simplified #1: The Fast Track to Singing Like a Pro", category: "Music" },
    { title: "MBA in a Box: Business Lessons from a CEO", category: "Business" },
    { title: "The Complete Financial Analyst Course 2024", category: "Business" },
    { title: "PMP Exam Prep Seminar - Earn 35 PDUs", category: "Business" },
    { title: "Investing In Stocks The Complete Course! (17 Hours)", category: "Business" },
    { title: "Accounting & Financial Statement Analysis: Complete Training", category: "Business" },
    { title: "Sales Training: Practical Sales Techniques", category: "Business" },
    { title: "Public Speaking & Communicating: Skip Theory, Master Art", category: "Business" }
];

console.log(`Generating ${realWorldCourses.length} real-world courses...`);

const newCourses = realWorldCourses.map((real, index) => {
    const i = index + 1;

    // Extract keywords from title for highly relevant images
    let keywords = '';
    const titleLower = real.title.toLowerCase();

    if (titleLower.includes('python')) keywords = 'python,code';
    else if (titleLower.includes('machine learning') || titleLower.includes('data science') || titleLower.includes('ai')) keywords = 'artificial-intelligence,data';
    else if (titleLower.includes('react')) keywords = 'reactjs,code';
    else if (titleLower.includes('java') && !titleLower.includes('script')) keywords = 'java,programming';
    else if (titleLower.includes('javascript') || titleLower.includes('js')) keywords = 'javascript,code';
    else if (titleLower.includes('c#') || titleLower.includes('unity')) keywords = 'unity,game-development';
    else if (titleLower.includes('c++')) keywords = 'cpp,code';
    else if (titleLower.includes('golang') || titleLower.includes('go:')) keywords = 'golang,code';
    else if (titleLower.includes('docker') || titleLower.includes('kubernetes')) keywords = 'docker,devops';
    else if (titleLower.includes('aws') || titleLower.includes('amazon')) keywords = 'aws,cloud';
    else if (titleLower.includes('cyber') || titleLower.includes('hacking') || titleLower.includes('security')) keywords = 'cyber-security,hacker';
    else if (titleLower.includes('web') || titleLower.includes('html') || titleLower.includes('css')) keywords = 'web-development,code';
    else if (titleLower.includes('design') || titleLower.includes('figma') || titleLower.includes('adobe')) keywords = 'ui-design,creative';
    else if (titleLower.includes('android') || titleLower.includes('kotlin')) keywords = 'android,mobile';
    else if (titleLower.includes('ios') || titleLower.includes('swift')) keywords = 'ios,iphone';
    else if (titleLower.includes('sql') || titleLower.includes('database')) keywords = 'sql,database';
    else if (titleLower.includes('excel') || titleLower.includes('finance')) keywords = 'excel,finance';
    else if (titleLower.includes('marketing') || titleLower.includes('seo')) keywords = 'digital-marketing,analytics,tech';
    else if (titleLower.includes('music') || titleLower.includes('piano') || titleLower.includes('guitar')) keywords = 'music-software,digital-audio,computer';
    else if (titleLower.includes('photo') || titleLower.includes('video')) keywords = 'video-editing-software,monitor,tech';
    else if (titleLower.includes('business') || titleLower.includes('mba') || titleLower.includes('investing')) keywords = 'fintech,trading-software,analytics';
    else {
        // Fallback to strict tech categories
        if (real.category === 'Web Development') keywords = 'web-development,coding,monitor';
        else if (real.category === 'Data Science') keywords = 'data-science,code,matrix';
        else if (real.category === 'Mobile Development') keywords = 'mobile-app-code,smartphone';
        else if (real.category === 'Game Development') keywords = 'game-engine,code,3d';
        else if (real.category === 'DevOps') keywords = 'server-room,terminal,ops';
        else if (real.category === 'Design') keywords = 'ui-ux-design,computer,interface';
        else if (real.category === 'Security') keywords = 'cyber-security,lock,code';
        else keywords = 'programming,code,computer';
    }

    // Use Pollinations.ai for real-time AI image generation
    // Construct a specific, detailed prompt for the AI
    const aiPrompt = encodeURIComponent(`${real.title} course, ${keywords}, futuristic, high quality, 4k, tech wallpaper, programming code overlay, dark mode aesthetic, vibrant colors`);

    return {
        id: i.toString(),
        title: real.title,
        description: `Master ${real.title} in this comprehensive masterclass.`,
        instructor: `instructor${(i % 10) + 1}`,
        instructorName: `Expert Instructor ${i}`,
        price: [19.99, 29.99, 49.99, 89.99, 99.99, 12.99, 9.99][index % 7],
        rating: parseFloat((4 + Math.random()).toFixed(1)),
        students: Math.floor(Math.random() * 50000) + 1000,
        category: real.category,
        // Add random seed to ensure absolute uniqueness even for similar topics
        thumbnail: `https://image.pollinations.ai/prompt/${aiPrompt}?width=800&height=400&nologo=true&seed=${i}`,
        createdAt: new Date().toISOString(),
        videoReviewUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
        lessons: Array.from({ length: 10 }, (_, lessonIndex) => ({
            id: `${i}-${lessonIndex + 1}`,
            title: `Module ${lessonIndex + 1}: ${[
                "Course Introduction & Setup",
                "Core Concepts Deep Dive",
                "Advanced Techniques",
                "Building the Project Structure",
                "Implementing Key Features",
                "Debugging & Optimization",
                "Testing & Deployment",
                "Real World Application",
                "Bonus Content & Tips",
                "Course Conclusion & Next Steps"
            ][lessonIndex]}`,
            duration: 1200 + (lessonIndex * 300), // Varying duration
            description: `Detailed walkthrough of module ${lessonIndex + 1} covering essential topics.`,
            videoUrl: lessonIndex % 2 === 0
                ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        }))
    };
});

// Preserve problems data
if (db.problems) {
    db.courses = newCourses;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log('Successfully replaced courses with 100 Real World titles and relevant unique images.');
} else {
    console.error('Error: db.json structure invalid.');
}
