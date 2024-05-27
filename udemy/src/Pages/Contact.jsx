import React from 'react'
import { Button, TextField } from '@mui/material';
import './Contact.css';
const Contact = () => {
  return (
    <>
<div className='contact-div'> 
<form> 
<TextField placeholder='Enter Name'  type='text' required fullWidth margin='dense' ></TextField>
<TextField placeholder='Enter Email'  type='email' required margin='dense' fullWidth></TextField>
<textarea name='' value={} onChange={}></textarea>
<Button variant='contained' fullWidth type='submit' >Send Message</Button>
</form>
</div>

    </>
  )
}

export default Contact;