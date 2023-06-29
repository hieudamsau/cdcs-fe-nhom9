import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import React from 'react'
import { useDispatch } from 'react-redux'
import './styles.scss'
const Widget = ({ title, price, desc, background }) => {
   const dispatch = useDispatch()

   const style = {
      background: background,
   }
   return (
      <>
         <div className="widget" style={style}>
            <div className="left">
               <span className="title">{title}</span>
               <span className="counter">{price}</span>
               <span className="link">{desc}</span>
            </div>
            <div className="right">
               <div className="percentage positive">
                  <TrendingUpOutlinedIcon />
               </div>
            </div>
         </div>
      </>
   )
}

export default Widget