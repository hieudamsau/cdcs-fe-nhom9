import React, { useEffect } from 'react'
// import Widget from '../../components/widget/Widget'
// import Layout from '../../layout/Layout'

import './style.scss'
// import { useDispatch, useSelector } from 'react-redux'
// import { getProducts } from '../../redux/slice/productSlice'
// import { getAllNew } from '../../redux/slice/newSlice'
// import { getServices } from '../../redux/slice/servicesSlice'
const Home = () => {
   // const dispatch = useDispatch()
   // const { listProducts } = useSelector((state) => state.product)
   // const { listNews } = useSelector((state) => state.new)
   // const { listServices } = useSelector((state) => state.service)
   // useEffect(() => {
   //    dispatch(getProducts())
   //    dispatch(getAllNew())
   //    dispatch(getServices('SERVICES'))
   // }, [])
   return (
      <>
         {/* <div className="content-home">
            <div className="heading">Dashboard SmileTech</div>

            <div className="widgets">
               <Widget
                  background={'#a9d9bf'}
                  title={'Products'}
                  price={listProducts.length}
                  desc={`Có tổng cộng ${listProducts.length} products`}
               />
               <Widget
                  background={'#a9d9d8'}
                  title={'Categories'}
                  price={listProducts.length}
                  desc={`Có tổng cộng ${listProducts.length} categories`}
               />
               <Widget
                  background={'#a9b8d9'}
                  title={'Services'}
                  price={listServices.length}
                  desc={`Có tổng cộng ${listServices.length} services`}
               />
               <Widget
                  background={'#d9b8a9'}
                  title={'Supports'}
                  price={listServices.length}
                  desc={`Có tổng cộng ${listProducts.length} supports`}
               />
               <Widget background={'#ced9a9'} title={'News'} price={listNews.length} desc={` Có tổng cộng ${listNews.length} news`} />
            </div>
         </div> */}
         admin Home
      </>
   )
}

export default Home
