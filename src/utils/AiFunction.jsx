import {CommonQuestionaryMenu, systemPrompt} from "../constants.js" 
import Groq from 'groq-sdk';
import { useExecutionProvider } from "../Context/ExecutionProvider.jsx";

console.log(import.meta.env['VITE_GROQ_API_KEY']);

const client = new Groq({
  apiKey: import.meta.env['VITE_GROQ_API_KEY'], // This is the default and can be omitted
  dangerouslyAllowBrowser:true
});


/**
 * This function does something with the data from Grok API.
*
* @param {{ AiGenerate: string }} data - An object with an `AiGenerate` key as string.
* @returns {any} - Returns a transformed result.
 */

export async function GrokApi(data,storeExecution) {
  // const {storeExecution,setStoreExecution} = useExecutionProvider()
  // Your logic here
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {role:"system",content:`${systemPrompt}`},
      {role:"assistant",content:`${storeExecution}`},
      { role: 'user', content: `json ${CommonQuestionaryMenu} ${data.AiGenerate}` }
    ],
    model: "deepseek-r1-distill-llama-70b",
    
    response_format:{
      type: "json_object"
    },
  });

  console.log(chatCompletion.choices[0].message.content);
  return chatCompletion.choices[0].message.content
}

