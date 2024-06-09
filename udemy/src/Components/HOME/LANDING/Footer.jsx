import React from 'react';
import './footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Button, IconButton } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
const Footer = () => {
  return (
    <> 
    <div className='parent-footer'> 
      <div className='navigation-footer'>
        <div className='left-footer'>
          <h1>HUBLET</h1>
          <p>Lopsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text</p>
          <div className='icon-footer'>
            <IconButton color='primary'><FacebookIcon/></IconButton>
            <IconButton sx={{color:"black"}}><XIcon/></IconButton>
            <IconButton color='primary'><LinkedInIcon/></IconButton>
            <IconButton color='secondary'><InstagramIcon/></IconButton>
            <IconButton sx={{color:"red"}}><PinterestIcon/></IconButton>
          </div>
        </div>
        <div className='middle-footer'>
          <ul>
            <li><a href='#'>About Us</a></li> <br></br>
            <li><a href='#'>Contact</a></li> <br></br>
            <li><a href='#'>Faq</a></li><br></br>
            <li><a href='#'>Search</a></li><br></br>
            <li><a href='#'>Terms Conditions</a></li>
          </ul>
        </div>
        <div className='right-footer'>
          <h6>Newsletter</h6>
          <input type='email' placeholder='Enter your email'></input>
          <Button variant='contained'>Subscribe</Button>
       <div className='footer-images'>
<img src='src\Components\IMAGES\mastercard.jpg' ></img>
<img src='src\Components\IMAGES\visa.jpg'></img>
<img src='src\Components\IMAGES\paypal.png'></img>
 <img src='src\Components\IMAGES\discover.jpg'></img>
       </div>
        </div>
      </div>
      </div>
    <div className='copyright'>
        <h1>Copyright</h1> 
        <CopyrightIcon sx={{height:"40px"}}/>
        <h1>2021 Hublet By Qodex</h1>
    </div>
    
    </>
  );
}

export default Footer;
