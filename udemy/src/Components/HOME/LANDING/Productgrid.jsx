import React, { useEffect, useState } from "react";
import axios from "axios";
import "./productgrid.css";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Alert } from "@mui/material";
import { useCart } from 'react-use-cart';
import Swal from "sweetalert2";



const Productgrid = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[selectedItem,setselectedItem]=useState(null);
  const[alerttoggle,setalertoggle]=useState(false);
  const {addItem} = useCart();
  const isLoggedIn = localStorage.getItem("isloggedin") === "true";
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setData(response.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const cardaction=(data)=>{
    if(!isLoggedIn)
      {
        Swal.fire({
          title: "You are not logged in",
          text: "Please Login to continue",
          icon: "error"
        });
        
      }
      else
      {
    addItem(data);
      
setalertoggle(true);    
    console.log(data);
    setselectedItem(data.title);

    setTimeout(()=>{
setalertoggle(false);

    },4000)}
  }
  const handleCloseAlert=()=>{

setselectedItem(null);
setalertoggle(false);


  }

  return (
    <> 

    <Swiper
    slidesPerView={4}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 1300,
        disableOnInteraction: false,
      }}
      // pagination={{
      //   clickable: true,
      // }}
    loop={true}
      // navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >

      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="products">
            <Card sx={{ maxWidth: 345, width: "280px" }}>
              <CardActionArea className="cardaction" onClick={()=>cardaction(item)}> {/*CardActionArea is also a button*/ }
                <div style={{height:"300px"}}> <CardMedia className="cardmedia"
                  component="img"
                  image={item.thumbnail}
                  alt={item.title}/>
                </div> 
               
                <ShoppingCartIcon className="icon-grid"/>
                
                  <Typography variant="h5" component="h6"  className="text-product-grid" >
                    {item.title}
                    <br />
                    {'$' + item.price}
                  </Typography>
               
              </CardActionArea>
            </Card>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    {alerttoggle&&<Alert severity="success" variant="filled"  onClose={handleCloseAlert}>{selectedItem} successfully added to the cart</Alert>}
</>
  );
};

export default Productgrid;
