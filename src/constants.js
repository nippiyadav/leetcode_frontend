export const CommonQuestionaryMenu = {
    codeSnippets: {},
    constraints: [],
    defficulty: "",
    description: "",
    example: [],
    hints: [],
    language: "",
    company: [],
    demo: false,
    referenceSolution: {},
    tags: [],
    templateCode: {},
    testCases: [],
    title: "",
}


export const systemPrompt = `
You are an expert problem writer for LeetCode-style coding platforms.

please change the json data on the basis of question being asked from you, do not make it static data

write all code and with Jason file structure and when you will write the codeSnippets then give following attention
in codeSnippets you have to write code for getting parmeter which will be passed to the function , 
when you write codeSnippet related to the java please keep in mind that i am using a placeholder {{solution}} for inserting the java main logic code because java does not run outside the main class, so please write very carefull for this code
because i am running this code in the judge0 code execution platform

please add the company in the field of company which are array you can add 3 different company,
when i will say change demo to true then you change in your response a field of demo value false to true otherwise keep it false



{ 
    "title": "Add Two Numbers", 
    "description": "Given 2 number add them up", 
    "difficulty": "HARD", 
    "company": ["google","netflix","amazon"],
    "demo": boolean,
    "tags": ["numbers", "maths", "operations"], 
    "example": [
        { "input": "3 7", "output": "10", "explanation": "Adding 3 and 7 gives 10" }, 
        { "input": "3 5", "output": "8", "explanation": "Adding 3 and 5 gives 8" }
    ], 
    "templateCode": {
        "javascript": "function addTwoNumbers(a, b) {\\n     // Write your code here\\n     // Return the sum of a and b\\n     return a + b\\n}", 
        "python": "def add_two_numbers(a, b):\\n      # Write your code here\\n      # Return the sum of a and b\\n      return a + b", 
        "java": "public static int addTwoNumbers(int a, int b) {\\n     // Write your code here\\n     // Return the sum of a and b\\n     return a + b;\\n}"
    }, 
    "constraints": ["-10^9 < a, b < 10^9"], 
    "hints": ["Add values using the + operator"], 
    "codeSnippets": {
        "javascript": "const fs = require('fs');\\nconst input = fs.readFileSync(0, 'utf-8').trim();\\nconst [a, b] = input.split(' ').map(Number);", 
        "python": "import sys\\ninput_line = sys.stdin.read()\\na, b = map(int, input_line.split())", 
        "java": "import java.util.Scanner;\\npublic class Main {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        int a = sc.nextInt();\\n        int b = sc.nextInt();\\n        System.out.println(addTwoNumbers(a, b));\\n    }\\n    public static int addTwoNumbers(int a, int b) {\\n        return a + b;\\n    }\\n}"
    }, 
    "testCases": [
        { "input": "10 20", "output": "30" }, 
        { "input": "10 30", "output": "40" }, 
        { "input": "10 50", "output": "60" }
    ], 
    "referenceSolution": {
        "javascript": "function addTwoNumbers(a, b) {\\n     return a + b;\\n}\\nconsole.log(addTwoNumbers(a, b));", 
        "python": "def add_two_numbers(a, b):\\n    return a + b\\n\\nprint(add_two_numbers(a, b))", 
        "java": "public static int addTwoNumbers(int a, int b) {\\n    return a + b;\\n}"
    }
}

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
    "codeSnippets": { "javascript": "const fs = require('fs');\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);", "python": "import sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())", "java": "import java.util.Scanner;\npublic class Main {\n     {{solution}}\n     public static void main(String[] args) {\n          Scanner sc = new Scanner(System.in);\n          int a = sc.nextInt();\n          int b = sc.nextInt();\n          System.out.println(addTwoNumbers(a, b));\n          }\n     }" }, "tastCases": [{ "input": "10 20", "output": "30" }, { "input": "10 30", "output": "40" }, { "input": "10 50", "output": "60" }], "refrenceSolution": { "javascript": "function addTwoNumbers(a, b) {\n     // Write your code here\n     // Return the sum of a and b\n     return a + b\n}\nconsole.log(addTwoNumbers(a, b));", "python": "def add_two_numbers(a, b):\n      # Write your code here   \n      # Return the sum of a and b\n      return a + b\n\nprint(add_two_numbers(a, b))", "java": "\npublic static int addTwoNumbers(int a, int b) {\n          // Write your code here\n          // Return the sum of a and b\n          return a + b;\n      }\n     " }, "createdAt": "2025-05-24T12:26:16.925Z", "updatedAt": "2025-05-24T12:26:16.925Z"
}


export const dashboardConvertingFn = (data) => {
    // console.log("data constants:- ",data);

    return data.reduce((prev, cur, index) => {
        // console.log(prev,cur);

        prev.problemSolvedData.push(
            {
                id: cur.id,
                title: cur.title,
                difficulty: cur.difficulty
            }
        )

        cur.solvedLanguage.map((v, i) => {
            // console.log(prev.usedLanguageProblemSolved[v.language] ?? 0);
            return prev.usedLanguageProblemSolved[v.language.toLowerCase()] = (prev.usedLanguageProblemSolved[v.language.toLowerCase()] || 0) + v._count
        })

        return prev

    }, { usedLanguageProblemSolved: {}, problemSolvedData: [] })
}



export function data(dashboard) {
    return {

        // ['Red','Blue','Yellow']
        labels: [...Object.keys(dashboard?.usedLanguageProblemSolved ?? [])],
        datasets: [
            {
                label: 'Language Used',
                // [300, 50, 100]
                data: [...Object.values(dashboard?.usedLanguageProblemSolved ?? [])],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }
        ],
    }
};

