import React, { useState } from 'react';
import { useEffect } from 'react';

function ExecutionLanguageComponents({
  templateLanguage,
  setTemplateLanguage,
  setcodeSnippetlanguage,
  setrefreshSolutionLanguage,
  setWhichActive,
  codeSnippetlanguage,
  refreshSolutionLanguage
}) {
  const [codeLanguage,setCodeLanguage] = useState(['Javascript', 'Python', 'Java']);
  console.log(templateLanguage,codeSnippetlanguage,refreshSolutionLanguage);
  

  const handleSnippetChange = (e) => {
    const value = e.target.value;
    setWhichActive('codeSnippetlanguageCode');
    setcodeSnippetlanguage(value);

    // Reset the snippet select
    setTemplateLanguage("#")
    setrefreshSolutionLanguage("#") 
  };
  
  const handleRefreshChange = (e) => {

    setWhichActive('refreshSolutionLanguageCode');
    const value = e.target.value;
    setrefreshSolutionLanguage(value);

    // Reset the snippet select
    setTemplateLanguage("#")
    setcodeSnippetlanguage("#")    
  };
  
  const handleTemplateChange = (e) => {
    setWhichActive('templateCode');
    const value = e.target.value;
    setTemplateLanguage(value);
    
    
    // Reset the snippet select
    setcodeSnippetlanguage("#");
    setrefreshSolutionLanguage("#");
  };

  return (
    <>
      <div>
        <span>CodeSnippets:</span>
        <select
          value={codeSnippetlanguage}
          onChange={handleSnippetChange}
          name="codeSnippetLanguage"
          id="codeSnippetLanguageSelect"
        >
          <option value="#">Select Language</option>
          {codeLanguage.map((v, i) => (
            <option key={i} value={v.toLowerCase()}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span>RefreshSolution:</span>
        <select
          value={refreshSolutionLanguage}
          onChange={handleRefreshChange}
          name="refreshSolutionLanguage"
          id="refreshSolutionLanguageSelect"
        >
          <option value="#">Select Language</option>
          {codeLanguage.map((v, i) => (
            <option key={i} value={v.toLowerCase()}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span>Template:</span>
        <select
          value={templateLanguage}
          onChange={handleTemplateChange}
          name="templateLanguage"
          id="templateLanguageSelect"
        >
          <option value="#">Select Language</option>
          {codeLanguage.map((v, i) => (
            <option key={i} value={v.toLowerCase()}>
              {v}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default ExecutionLanguageComponents;
