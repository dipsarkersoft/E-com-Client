import React from 'react'
import { Carousel } from 'antd';
// const contentStyle = {
//   height: '400px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };



const Hero = ({
     title,
     subTitle="welcome to React E-commerce"
}) => {
  return (
    <div className='container-fluid'>
     <div className='row'>
     <Carousel autoplay>
    <div className='hero1'>

     <h2>Trending Iteam</h2>
     <h1>MODERN SUNGLASS</h1>
     <h3>
          starting at $ 20
     </h3>
     <button className='btn btn-outline-danger'> BUY NOW</button>




    </div>
    <div className='hero2'>
    <h2>Trending Iteam</h2>
     <h1>MODERN SUNGLASS</h1>
     <h3>
          starting at $ 20
     </h3>
     <button className='btn btn-outline-danger'> BUY NOW</button>
    </div>
    <div  className='hero3'>
    <h2>Trending Iteam</h2>
     <h1>MODERN SUNGLASS</h1>
     <h3>
          starting at $ 20
     </h3>
     <button className='btn btn-outline-danger'> BUY NOW</button>
    </div>
    <div  className='hero4'>
    <h2>Trending Iteam</h2>
     <h1>MODERN SUNGLASS</h1>
     <h3>
          starting at $ 20
     </h3>
     <button className='btn btn-outline-danger'> BUY NOW</button>
    </div>
  </Carousel>
          

     </div>
      
    </div>
  )
}

export default Hero
