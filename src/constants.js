import { ProblemEndpoint } from "./Api/ClientApi";

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
You are an expert problem-set writer for competitive programming platforms. I want you to generate problems in a specific JSON format compatible with Judge0. Please follow these rules exactly:

1. The returned format must be a single JSON object.
2. Each problem includes the following top-level keys (only these keys):
   - title
   - description
   - difficulty
   - tags
   - company
   - demo (default false unless told to true)
   - example (array of detailed input/output/explanation)
   - constraints
   - hints
   - templateCode (just function template logic)
   - referenceSolution (core logic of the function only)
   - codeSnippets (Judge0-ready code that includes stdin reading and main function call)
   - testCases (just input/output that matches parameters)

3. 💡 Most important:
   - 'referenceSolution': Must contain only the function logic (e.g., 'def func(...): return ...')
   - 'codeSnippets': Must contain the boilerplate to get stdin and call the function, and include:
     - '{{solution}}' placeholder for Java — this must be replaced by the reference solution before executing.
     - No duplicate function definitions inside codeSnippets. Only the function call and input reading logic.
     - Use language-specific standard modules for input:
       - Python: 'sys.stdin.read()'
       - JS: 'require("fs").readFileSync(0, "utf-8")'
       - Java: Use 'Scanner' and embed '{{solution}}'

4. ✅ Output must be valid and runnable by joining:
   - Non-Java: 'referenceSolution + '\n\n' + codeSnippets'
   - Java: Replace '{{solution}}' inside 'codeSnippets' with 'referenceSolution'

5. 👨‍🏫 Examples and explanations must clearly describe every tricky term or operation in simple English.

6. 🔍 Avoid unnecessary keys in testCases — only 'input' and 'output' are needed.

7. 🏢 The 'company' field must include 3 known tech companies (like Google, Amazon, etc.)

8. Write clean, readable code with correct indentation in all language sections.

Start by giving me one full problem in this format.


{
  "title": "Find Maximum Difference",
  "description": "You are given an array of integers. Return the maximum difference between any two elements such that the smaller element appears before the larger one.\n\nThe word 'difference' means subtraction between two numbers: larger - smaller.\n\nFor example: in array [2, 3, 10, 6, 4, 8, 1], the max difference is 10 - 2 = 8.",
  "difficulty": "MEDIUM",
  "tags": ["arrays", "greedy", "subarray"],
  "company": ["google", "amazon", "meta"],
  "demo": false,
  "example": [
    {
      "input": "7\n2 3 10 6 4 8 1",
      "output": "8",
      "explanation": "10 comes after 2, so 10 - 2 = 8 is the max difference"
    },
    {
      "input": "5\n7 9 5 6 3",
      "output": "2",
      "explanation": "9 - 7 = 2 is the maximum valid difference"
    }
  ],
  "constraints": [
    "2 <= n <= 10^5",
    "-10^4 <= arr[i] <= 10^4"
  ],
  "hints": [
    "Keep track of the minimum value seen so far while traversing the array",
    "Update max difference only when you find a larger difference"
  ],
  "templateCode": {
    "python": "def max_difference(arr):\n    # Your code here\n    pass",
    "javascript": "function maxDifference(arr) {\n    // Your code here\n}",
    "java": "public static int maxDifference(int[] arr) {\n    // Your code here\n    return 0;\n}"
  },
  "referenceSolution": {
    "python": "def max_difference(arr):\n    min_val = arr[0]\n    max_diff = float('-inf')\n    for i in range(1, len(arr)):\n        if arr[i] - min_val > max_diff:\n            max_diff = arr[i] - min_val\n        if arr[i] < min_val:\n            min_val = arr[i]\n    return max_diff",
    "javascript": "function maxDifference(arr) {\n    let min = arr[0];\n    let maxDiff = -Infinity;\n    for (let i = 1; i < arr.length; i++) {\n        maxDiff = Math.max(maxDiff, arr[i] - min);\n        min = Math.min(min, arr[i]);\n    }\n    return maxDiff;\n}",
    "java": "public static int maxDifference(int[] arr) {\n    int min = arr[0];\n    int maxDiff = Integer.MIN_VALUE;\n    for (int i = 1; i < arr.length; i++) {\n        maxDiff = Math.max(maxDiff, arr[i] - min);\n        min = Math.min(min, arr[i]);\n    }\n    return maxDiff;\n}"
  },
  "codeSnippets": {
    "python": "import sys\ninput_lines = sys.stdin.read().strip().split('\\n')\nn = int(input_lines[0])\narr = list(map(int, input_lines[1].split()))\nprint(max_difference(arr))",
    "javascript": "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst arr = input[1].split(' ').map(Number);\nconsole.log(maxDifference(arr));",
    "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = Integer.parseInt(sc.nextLine());\n        int[] arr = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        System.out.println(maxDifference(arr));\n    }\n\n    {{solution}}\n}"
  },
  "testCases": [
    { "input": "6\n1 2 90 10 110", "output": "109" },
    { "input": "5\n7 1 5 3 6", "output": "5" },
    { "input": "3\n5 3 1", "output": "-1" }
  ]
}


`



export const Menu = [
    {
        name: "Home",
        childElem: "",
        href: "/"
    },
    {
        name: "Problems",
        childElem: "",
        href: "all-problem?page=1&limit=10"
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
                difficulty: cur.difficulty,
                solvedLanguage:cur.solvedLanguage,
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










export function allLeetCodeProblem(){
    const newway = async()=>{
          try {
            const response = await ProblemEndpoint.Get("get-all-problem");
            console.log("response:- ",response);
            // setLeetCodeProblem(response.data??[])
            return response.data??[]
          } catch (error) {
            console.log("Error:- ",error);
          }
        }
        newway()
} 