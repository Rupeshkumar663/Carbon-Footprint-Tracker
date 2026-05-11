import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
const ScrollToTop=()=>{
  const [show,setShow]=useState(false);
  useEffect(()=>{
    const handleScroll=()=>{
      if(window.pageYOffset>250){
        setShow(true);
      } else{
        setShow(false);
      }
    };
    window.addEventListener("scroll",handleScroll);
    return ()=>window.removeEventListener("scroll", handleScroll);
  },[]);

  const scrollTop=()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth",
    });
  };

  return (
    <>
      {show && (
        <button onClick={scrollTop}  className=" fixed bottom-5  right-5 z-[9999] w-11  h-11 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex  items-center justify-center  shadow-lg shadow-cyan-500/20 hover:bg-green-500 hover:border-green-400  hover:-translate-y-1  transition-all duration-300 " >

          <ArrowUp size={18} className=" text-white "/>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;