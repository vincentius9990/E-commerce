import React from 'react'
import './Services.css'
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
const Services = () => {
  return (
    <>
    
<div className='parentServices'>
<div className='leftServices'>
<div className='animated-icon'>  <SettingsIcon/> </div>
<h1>7 days Return</h1>
<p>Lorem is simply dummy text of the printing text of the printing.</p>
</div>
<div className='middleServices'>
<div className='animated-icon'> <LockIcon/></div>
<h1>100% Payment Secure</h1>
<p>Lorem is simply dummy text of the printing text of the printing.</p>
</div>
<div className='rightServices'>
<div className='animated-icon'>  <AssignmentReturnedIcon/> </div>
<h1>Support 24/7</h1>
<p>Lorem is simply dummy text of the printing text of the printing.</p>
</div>
</div>
<hr></hr>
    </>
  )
}

export default Services