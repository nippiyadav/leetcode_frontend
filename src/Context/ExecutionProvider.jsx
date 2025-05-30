import { createContext, useContext, useState } from "react";

const StoreExecution = createContext(null)


function ExecutionProvider({children}) {
    // const [storeExecution,setStoreExecution] = useState({
    //   title:"",
    //   description:"",
    //   defficulty:"",
    //   tags:[],
    //   example:[],
    //   constraints:[ ],
    //   company: [],
    //   demo: false,
    //   hints:[ ],
    //   language:"",
    //   templateCode:{},
    //   testCases:[],
    //   codeSnippets:{},
    //   referenceSolution: { }
    // });
    
    const [storeExecution,setStoreExecution] = useState(
{
  "title": "Longest Subarray with Sum K",
  "description": "You are given an array of integers and an integer K. Find the length of the longest subarray whose sum equals K.\\n\\n💡 A *subarray* is a contiguous part of an array.\\nFor example, in the array [1, 2, 3], the subarray [2, 3] has sum 5.\\nThis problem requires optimal time complexity. Use prefix sums with a hashmap.",
  "difficulty": "HARD",
  "company": ["amazon", "adobe", "flipkart"],
  "demo": false,
  "tags": ["array", "hashmap", "prefix-sum", "sliding-window"],
  "example": [
    {
      "input": "8\\n1 2 3 -2 5 1 -1 3\\n5",
      "output": "4",
      "explanation": "The subarray [3, -2, 5, -1] has sum 5 and length 4."
    },
    {
      "input": "5\\n1 1 1 1 1\\n2",
      "output": "2",
      "explanation": "Multiple subarrays like [1, 1] exist with sum 2, length 2."
    }
  ],
  "templateCode": {
    "javascript": "function longestSubarraySumK(arr, k) {\n  // Write your code here\n}",
    "python": "def longest_subarray_sum_k(arr, k):\n    # Write your code here",
    "java": "public static int longestSubarraySumK(int[] arr, int k) {\n    // Write your code here\n}"
  },
  "constraints": ["1 <= arr.length <= 10^5", "-10^4 <= arr[i] <= 10^4", "-10^9 <= k <= 10^9"],
  "hints": [
    "Use a hashmap to store prefix sums and their earliest indices.",
    "If current_sum - k exists in map, we found a valid subarray."
  ],
  "codeSnippets": {
    "javascript": "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst arr = input[1].split(' ').map(Number);\nconst k = parseInt(input[2]);\nconsole.log(longestSubarraySumK(arr, k));",
    "python": "import sys\ndata = sys.stdin.read().strip().split()\nn = int(data[0])\narr = list(map(int, data[1:1+n]))\nk = int(data[1+n])\nprint(longest_subarray_sum_k(arr, k))",
    "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n        int k = sc.nextInt();\n        System.out.println({{solution}});\n    }\n    {{solution}}\n}"
  },
  "testCases": [
    { "input": "5\\n1 2 3 -2 2\\n3", "output": "3" },
    { "input": "6\\n-1 2 3 1 -2 4\\n4", "output": "4" }
  ],
  "referenceSolution": {
    "javascript": "function longestSubarraySumK(arr, k) {\n  const map = new Map();\n  let sum = 0, maxLen = 0;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n    if (sum === k) maxLen = i + 1;\n    if (map.has(sum - k)) maxLen = Math.max(maxLen, i - map.get(sum - k));\n    if (!map.has(sum)) map.set(sum, i);\n  }\n  return maxLen;\n}",
    "python": "def longest_subarray_sum_k(arr, k):\n    prefix_map = {}\n    current_sum = 0\n    max_len = 0\n    for i, num in enumerate(arr):\n        current_sum += num\n        if current_sum == k:\n            max_len = i + 1\n        if current_sum - k in prefix_map:\n            max_len = max(max_len, i - prefix_map[current_sum - k])\n        if current_sum not in prefix_map:\n            prefix_map[current_sum] = i\n    return max_len",
    "java": "public static int longestSubarraySumK(int[] arr, int k) {\n    Map<Integer, Integer> map = new HashMap<>();\n    int sum = 0, maxLen = 0;\n    for (int i = 0; i < arr.length; i++) {\n        sum += arr[i];\n        if (sum == k) maxLen = i + 1;\n        if (map.containsKey(sum - k)) maxLen = Math.max(maxLen, i - map.get(sum - k));\n        if (!map.containsKey(sum)) map.put(sum, i);\n    }\n    return maxLen;\n}"
  }
}







)
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

