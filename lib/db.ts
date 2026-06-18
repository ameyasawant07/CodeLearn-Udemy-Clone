import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'student' | 'instructor';
  enrolledCourses: string[];
  solvedProblems: string[];
  completedLessons: { courseId: string; lessonId: string; completedAt: string }[];
  completedCourses: { courseId: string; completedAt: string }[];
  credentialPoints: number;
  createdAt: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorName: string;
  price: number;
  rating: number;
  students: number;
  lessons: Lesson[];
  category: string;
  thumbnail: string;
  createdAt: string;
}

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: number;
  description: string;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  testCases: TestCase[];
  starterCode: {
    javascript: string;
    python: string;
    java: string;
  };
  solution: string;
  acceptance: number;
  submissions: number;
}

interface TestCase {
  input: any;
  expectedOutput: any;
  isHidden: boolean;
}

interface Submission {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded';
  runtime: number;
  memory: number;
  submittedAt: string;
}

interface Database {
  users: User[];
  courses: Course[];
  problems: Problem[];
  submissions: Submission[];
}

function initDB(): Database {
  if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  }

  if (!fs.existsSync(dbPath)) {
    const initialData: Database = {
      users: [],
      courses: getInitialCourses(),
      problems: getInitialProblems(),
      submissions: [],
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }

  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function getInitialCourses(): Course[] {
  return [
    {
      id: '1',
      title: 'Complete Python Bootcamp',
      description: 'Master Python programming from zero to hero',
      instructor: 'instructor1',
      instructorName: 'John Doe',
      price: 49.99,
      rating: 4.8,
      students: 12500,
      category: 'Programming',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      createdAt: new Date().toISOString(),
      lessons: [
        {
          id: '1-1',
          title: 'Introduction to Python',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          duration: 1200,
          description: 'Learn the basics of Python',
        },
        {
          id: '1-2',
          title: 'Variables and Data Types',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          duration: 1800,
          description: 'Understanding variables in Python',
        },
      ],
    },
    {
      id: '2',
      title: 'JavaScript Mastery',
      description: 'Become a JavaScript expert',
      instructor: 'instructor2',
      instructorName: 'Jane Smith',
      price: 59.99,
      rating: 4.9,
      students: 18900,
      category: 'Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
      createdAt: new Date().toISOString(),
      lessons: [
        {
          id: '2-1',
          title: 'JavaScript Fundamentals',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          duration: 1500,
          description: 'Core JavaScript concepts',
        },
      ],
    },
    {
      id: '3',
      title: 'Data Structures & Algorithms',
      description: 'Master DSA for coding interviews',
      instructor: 'instructor1',
      instructorName: 'John Doe',
      price: 69.99,
      rating: 4.7,
      students: 15200,
      category: 'Computer Science',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      createdAt: new Date().toISOString(),
      lessons: [
        {
          id: '3-1',
          title: 'Arrays and Linked Lists',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          duration: 2000,
          description: 'Understanding arrays and linked lists',
        },
      ],
    },
  ];
}

function getInitialProblems(): Problem[] {
  return [
    {
      id: '1',
      title: 'Two Sum',
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]`,
      difficulty: 'easy',
      category: 'Array',
      acceptance: 45.5,
      submissions: 125000,
      testCases: [
        { input: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: [0, 1], isHidden: false },
        { input: { nums: [3, 2, 4], target: 6 }, expectedOutput: [1, 2], isHidden: false },
        { input: { nums: [3, 3], target: 6 }, expectedOutput: [0, 1], isHidden: true },
      ],
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
        python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        pass`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
      },
      solution: 'Use hash map to store seen numbers',
    },
    {
      id: '2',
      title: 'Reverse Linked List',
      description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []`,
      difficulty: 'easy',
      category: 'Linked List',
      acceptance: 68.2,
      submissions: 98000,
      testCases: [
        { input: { head: [1, 2, 3, 4, 5] }, expectedOutput: [5, 4, 3, 2, 1], isHidden: false },
        { input: { head: [1, 2] }, expectedOutput: [2, 1], isHidden: true },
      ],
      starterCode: {
        javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    
};`,
        python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        pass`,
        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        
    }
}`,
      },
      solution: 'Iterate and reverse pointers',
    },
    {
      id: '3',
      title: 'Longest Palindromic Substring',
      description: `Given a string s, return the longest palindromic substring in s.

Example 1:
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.

Example 2:
Input: s = "cbbd"
Output: "bb"`,
      difficulty: 'medium',
      category: 'String',
      acceptance: 30.5,
      submissions: 145000,
      testCases: [
        { input: { s: 'babad' }, expectedOutput: 'bab', isHidden: false },
        { input: { s: 'cbbd' }, expectedOutput: 'bb', isHidden: true },
      ],
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    
};`,
        python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        pass`,
        java: `class Solution {
    public String longestPalindrome(String s) {
        
    }
}`,
      },
      solution: 'Expand around centers',
    },
  ];
}

// Removed global caching to ensure external updates (like generation scripts) are picked up
// let db: Database = initDB();

export function getDB(): Database {
  // Always read from disk to get the latest data
  return initDB();
}

export function saveDB(data: Database): void {
  // Write to disk
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export type { User, Course, Problem, Submission, Lesson, TestCase };

