import { createContext, useContext, useState } from "react";

const StoreExecution = createContext(null)


function ExecutionProvider({children}) {
    const [storeExecution,setStoreExecution] = useState({
      title:"",
      description:"",
      defficulty:"",
      tags:[],
      example:[],
      constraints:[ ],
      company: [],
      demo: false,
      hints:[ ],
      language:"",
      templateCode:{},
      testCases:[],
      codeSnippets:{},
      referenceSolution: { }
    });
    
//     const [storeExecution,setStoreExecution] = useState(
//       {
//   "title": "Longest Substring Without Repeating Characters",
//   "description": "Given a string `s`, find the length of the longest substring without repeating characters.\n\n- A **substring** is a contiguous sequence of characters within a string.\n- You must return an integer representing the length of the longest such substring.\n\nFor example, in the string `abcabcbb`, the longest substring without repeating characters is `abc`, which has a length of 3.",
//   "difficulty": "Medium",
//   "tags": ["Hash Table", "String", "Sliding Window"],
//   "example": {
//     "input": "abcabcbb",
//     "output": "3"
//   },
//   "constraints": [
//     "0 <= s.length <= 50000",
//     "s consists of English letters, digits, symbols and spaces."
//   ],
//   "hints":[

//   ],
//   "example":[

//   ],
//   "testCases": [
//     { "input": "abcabcbb", "output": "3" },
//     { "input": "bbbbb", "output": "1" },
//     { "input": "pwwkew", "output": "3" },
//     { "input": "", "output": "0" },
//     { "input": "abcdef", "output": "6" }
//   ],
//   "referenceSolution": {
//     "python": "def lengthOfLongestSubstring(s):\n    char_set = set()\n    left = 0\n    max_len = 0\n    for right in range(len(s)):\n        while s[right] in char_set:\n            char_set.remove(s[left])\n            left += 1\n        char_set.add(s[right])\n        max_len = max(max_len, right - left + 1)\n    return max_len",
//     "java": "public static int lengthOfLongestSubstring(String s) {\n    Set<Character> set = new HashSet<>();\n    int left = 0, max = 0;\n    for (int right = 0; right < s.length(); right++) {\n        while (set.contains(s.charAt(right))) {\n            set.remove(s.charAt(left));\n            left++;\n        }\n        set.add(s.charAt(right));\n        max = Math.max(max, right - left + 1);\n    }\n    return max;\n}",
//     "javascript": "function lengthOfLongestSubstring(s) {\n    const set = new Set();\n    let left = 0, max = 0;\n    for (let right = 0; right < s.length; right++) {\n        while (set.has(s[right])) {\n            set.delete(s[left]);\n            left++;\n        }\n        set.add(s[right]);\n        max = Math.max(max, right - left + 1);\n    }\n    return max;\n}"
//   },
//   "codeSnippets": {
//     "python": "import sys\ns = sys.stdin.read().strip()\nprint(lengthOfLongestSubstring(s))",
//     "java": "import java.util.*;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        System.out.println(lengthOfLongestSubstring(s));\n    }\n\n    {{solution}}\n}",
//     "javascript": "const fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nconsole.log(lengthOfLongestSubstring(s));\n\n{{solution}}"
//   },
//   "templateCode": {
//     "python": "def lengthOfLongestSubstring(s):\n    # Write your code here\n    pass",
//     "java": "public static int lengthOfLongestSubstring(String s) {\n    // Write your code here\n}",
//     "javascript": "function lengthOfLongestSubstring(s) {\n    // Write your code here\n}"
//   }
// }


//     );

    const [testResponse,setTestResponse]  = useState([]);

  return (
    <StoreExecution.Provider value={{storeExecution,setStoreExecution,testResponse,setTestResponse}}>
        {children}
    </StoreExecution.Provider>
  )
}

export default ExecutionProvider

export const useExecutionProvider = ()=>{
    const value = useContext(StoreExecution);
    
    if (!value) {
        throw new Error("You did not configured the useContext")
    }
    
    return value
}

