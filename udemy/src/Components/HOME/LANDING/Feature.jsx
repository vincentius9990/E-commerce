import React from 'react'
import './feature.css'
import Card from './MYCard'
const Feature = () => {
  
  const img1='udemy/public/IMAGES/buildquality.jpg';
  const img2='src/Components/IMAGES/batterylife.jpg';
  const img3='src/Components/IMAGES/qualcomm-snapdragon-w5.webp';
  const img4='src/Components/IMAGES/Smart-Watch-Battery-Saving-Tips-Gear.jpg';
  // buildquality.jpg
  
    return (
    <>
    
<div className='feature-parent'>
<div className='left'>
<img src='/udemy/public/IMAGES/feature.jpg'/>

</div>
<div className='right'>
<Card image={img1} alt='img1' title="Build Quality and Design"/>
<Card image={img2} alt='img2' title="Excellent battery life"/>
<Card image={img3} alt='img3' title="Battery Life"/>
<Card image={img4} alt='img4' title="Accurate activity tracking"/>
</div>
</div>


    </>
  )
}

export default Feature