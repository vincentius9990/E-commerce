import React from 'react'
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './feature.css'
const MYCard = (props) => {
  return (
<>
<div className='card-image'> 
<Card sx={{ maxWidth: 345 }} >
      <CardActionArea>
        <CardMedia
          component="img"
       
          image={props.image}
          alt={props.alt}
          sx={{ height: 140, width:"100%" }} 
       className='cardmedia-feature'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

</div>
</>
  )
}

export default MYCard