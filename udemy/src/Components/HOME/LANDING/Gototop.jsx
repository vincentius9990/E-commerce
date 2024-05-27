import React, { useEffect, useState } from 'react'
import { IconButton} from '@mui/material';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import './gototop.css'
const Gototop = () => {
const[show,setshow]=useState(false);
const scrolltotop=()=>{

window.scrollTo({top:0,left:0,behavior:"smooth"})

} 
useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setshow(true);
      } else {
        setshow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
          <div className={`top-iconbtn ${show ? 'scrolled' : ''}`}>

   {show && (
<div onClick={scrolltotop}>

<IconButton  className='top-iconbtn'>

    <ArrowUpwardOutlinedIcon/>

</IconButton>
</div>)
    }
    </div>
    </>
  )
}

export default Gototop;