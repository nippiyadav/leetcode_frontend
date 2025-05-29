import {CommonQuestionaryMenu, systemPrompt} from "../constants.js" 
import Groq from 'groq-sdk';

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

export async function GrokApi(data) {
  // Your logic here
      const chatCompletion = await client.chat.completions.create({
    messages: [
      {role:"system",content:`${systemPrompt}`},
      { role: 'user', content: `json ${CommonQuestionaryMenu}data.AiGenerate` }
    ],
    model: "meta-llama/llama-4-maverick-17b-128e-instruct",
    
    response_format:{
      type: "json_object"
    },
  });

  console.log(chatCompletion.choices[0].message.content);
  return chatCompletion.choices[0].message.content
}

