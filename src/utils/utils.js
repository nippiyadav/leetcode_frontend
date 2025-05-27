export const ModefiedTesxtCase = (rawTestCases)=>{
    console.log(rawTestCases);
    
    const newTestCases = rawTestCases.map((v,i)=>{
        let obj = {}
        for (const [element,value] of Object.entries(v)) {
          console.log(element,value);
          if (element !== "output") {
            if (!obj.input) {
              obj["input"] = value
            }else{
              obj["input"] += " "+value
            }
            
          }else {
            if (!obj.output) {
              obj["output"] = value
            }
          }
        }
        return obj
      })

      return newTestCases
}