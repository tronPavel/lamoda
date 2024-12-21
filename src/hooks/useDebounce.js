import { useState, useEffect } from "react";

const useInputDebonce = (current, timeout = 700) => {
  const [value, setValue] = useState(current);

  useEffect(()=>{
  const debounce=setTimeout(()=>setValue(current),timeout)
  return ()=> clearTimeout(debounce)
  },[current,timeout])

  return value
  // //let debounce;
  // clearTimeout(debounce);
  // debounce = setTimeout(() => {
  //   onUpdateState({ [stateName]: value });
  // }, 800);
};
export default useInputDebonce;
