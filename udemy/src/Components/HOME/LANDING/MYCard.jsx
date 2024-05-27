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
<Card sx={{ maxWidth: 345 }} className='card-image'>
      <CardActionArea>
        <CardMedia
          component="img"
       
          image={props.image}
          alt={props.alt}
          sx={{ height: 140, width:"100%" }} 
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


</>
  )
}

export default MYCard