export const CommonQuestionaryMenu = {
    title: "Two Sum",
    tags: ["Easy", "Topics", "Companies", "Hint"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
    example: [
        {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
            input: "nums = [3,2,4], target = 6",
            output: "[1,2]",
        },
        {
            input: "nums = [3,3], target = 6",
            output: "[0,1]",
        }
    ],
    constraints: [
        "2 <= nums.length <= 104",
        "-109 <= nums[i] <= 109",
        "-109 <= target <= 109",
        "Only one valid answer exists."
    ],
    hints: [
        "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",

        "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",

        "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ],
    refrenceSolution: {
        java: "\npublic static int addTwoNumbers(int a, int b) {\n          // Write your code here\n          // Return the sum of a and b\n          return a + b;\n      }\n",
        javascript: "function addTwoNumbers(a, b) {\n     // Write your code here\n     // Return the sum of a and b\n     return a + b\n}\nconsole.log(addTwoNumbers(a, b));",
        python: "def add_two_numbers(a, b):\n      # Write your code here   \n      # Return the sum of a and b\n      return a + b\n\nprint(add_two_numbers(a, b))"
    },
    templateCode: {
        java: "\npublic static int addTwoNumbers(int a, int b) {\n     // Write your code here\n     // Return the sum of a and b\n     return a + b;\n}\n     ",
        javascript: "function addTwoNumbers(a, b) {\n     // Write your code here\n     // Return the sum of a and b\n     return a + b\n}",
        python: "def add_two_numbers(a, b):\n      # Write your code here   \n      # Return the sum of a and b\n      # please follow intentation"
    },
    codeSnippets: {
        java: "import java.util.Scanner;\npublic class Main {\n     {{solution}}\n     public static void main(String[] args) {\n          Scanner sc = new Scanner(System.in);\n          int a = sc.nextInt();\n          int b = sc.nextInt();\n          System.out.println(addTwoNumbers(a, b));\n          }\n     }",
        javascript: "const fs = require('fs');\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);",
        python: "import sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())"
    }

}


export const systemPrompt = `
You are an expert problem writer for LeetCode-style coding platforms.

You must respond ONLY with a valid JSON object in the following structure. Do NOT include markdown, explanations, comments, or anything else — only return the JSON object exactly like this, with properly filled data:

{ 
    "title": "Add Two Numbers", 
    "description": "Given 2 number add then up", 
    "difficulty": "HARD", 
    "tags": ["numbers", "maths", "operations"], 
    "example": [{ "input": "3 7", "output": "10", "explaination": "Adding 3 and 7 gives 10" }, { "input": "3 5", "output": "8", "explaination": "Adding 3 and 5 gives 8" }], 
    "templateCode": { "javascript": "function addTwoNumbers(a, b) {\n     // Write your code here\n     // Return the sum of a and b\n     return a + b\n}", "python": "def add_two_numbers(a, b):\n      # Write your code here   \n      # Return the sum of a and b\n      # please follow intentation", "java": "\npublic static int addTwoNumbers(int a, int b) {\n     // Write your code here\n     // Return the sum of a and b\n     return a + b;\n}\n     " }, "constraints": ["-10^9 < a, b < 10^9"], 
    "hints": ["adding value using + operator"], 
    "codeSnippets": { "javascript": "const fs = require('fs');\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);", "python": "import sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())", "java": "import java.util.Scanner;\npublic class Main {\n     {{solution}}\n     public static void main(String[] args) {\n          Scanner sc = new Scanner(System.in);\n          int a = sc.nextInt();\n          int b = sc.nextInt();\n          System.out.println(addTwoNumbers(a, b));\n          }\n     }" }, "tastCases": [{ "input": "10 20", "output": "30" }, { "input": "10 30", "output": "40" }, { "input": "10 50", "output": "60" }], "refrenceSolution": { "javascript": "function addTwoNumbers(a, b) {\n     // Write your code here\n     // Return the sum of a and b\n     return a + b\n}\nconsole.log(addTwoNumbers(a, b));", "python": "def add_two_numbers(a, b):\n      # Write your code here   \n      # Return the sum of a and b\n      return a + b\n\nprint(add_two_numbers(a, b))", "java": "\npublic static int addTwoNumbers(int a, int b) {\n          // Write your code here\n          // Return the sum of a and b\n          return a + b;\n      }\n     " }, "createdAt": "2025-05-24T12:26:16.925Z", "updatedAt": "2025-05-24T12:26:16.925Z" }

⚠️ Important:
- Fill in every field with relevant data based on the user's input prompt.
- Do not skip any field.
- Do not add any explanation outside the JSON.
- The response **must only** be valid JSON — no text, no markdown, no headings.


`;




export const Menu = [
    {
        name: "Home",
        childElem: "",
        href: "/"
    },
    {
        name: "Problems",
        childElem: "",
        href: "all-problem"
    },
    {
        name: "Create Problem",
        childElem: "",
        href: "/problem-create"
    },
]



const val = { 
    "title": "Add Two Numbers", 
    "description": "Given 2 number add then up", 
    "difficulty": "HARD", 
    "tags": ["numbers", "maths", "operations"], 
    "example": [{ "input": "3 7", "output": "10", "explaination": "Adding 3 and 7 gives 10" }, { "input": "3 5", "output": "8", "explaination": "Adding 3 and 5 gives 8" }], 
    "templateCode": { "javascript": "function addTwoNumbers(a, b) {\n     // Write your code here\n     // Return the sum of a and b\n     return a + b\n}", "python": "def add_two_numbers(a, b):\n      # Write your code here   \n      # Return the sum of a and b\n      # please follow intentation", "java": "\npublic static int addTwoNumbers(int a, int b) {\n     // Write your code here\n     // Return the sum of a and b\n     return a + b;\n}\n     " }, "constraints": ["-10^9 < a, b < 10^9"], "hints": ["adding value using + operator"], 
    "codeSnippets": { "javascript": "const fs = require('fs');\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);", "python": "import sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())", "java": "import java.util.Scanner;\npublic class Main {\n     {{solution}}\n     public static void main(String[] args) {\n          Scanner sc = new Scanner(System.in);\n          int a = sc.nextInt();\n          int b = sc.nextInt();\n          System.out.println(addTwoNumbers(a, b));\n          }\n     }" }, "tastCases": [{ "input": "10 20", "output": "30" }, { "input": "10 30", "output": "40" }, { "input": "10 50", "output": "60" }], "refrenceSolution": { "javascript": "function addTwoNumbers(a, b) {\n     // Write your code here\n     // Return the sum of a and b\n     return a + b\n}\nconsole.log(addTwoNumbers(a, b));", "python": "def add_two_numbers(a, b):\n      # Write your code here   \n      # Return the sum of a and b\n      return a + b\n\nprint(add_two_numbers(a, b))", "java": "\npublic static int addTwoNumbers(int a, int b) {\n          // Write your code here\n          // Return the sum of a and b\n          return a + b;\n      }\n     " }, "createdAt": "2025-05-24T12:26:16.925Z", "updatedAt": "2025-05-24T12:26:16.925Z" }