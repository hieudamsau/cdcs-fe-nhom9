import React, { useEffect, useState } from 'react'
import { getProduct } from '../../redux/product/productSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
 import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import { Button, Popconfirm, Select, Space, Table, Tag, message } from 'antd'
import { UrlImage } from '../../assets/configImage'
import { changeOrderStatus, getAccountOrders, getOrder, getOrderAdmin } from '../../redux/order/orderSlice'
import Widget from './widget'
import "./acout.scss"
const AccountOrders = () => {
   const location = useLocation()
   const titleList = location.pathname.slice(1)
   const breadCrum = titleList.split('/')
   const navigate = useNavigate()
   const [searchProduct, setSearchProduct] = useState()
   const [selectStatus,setSelectStatus]=useState()
   

   const handleChange = (e) => {
      setSearchProduct(e.target.value)
   }
   function capitalizeFirstLetter(word) {
      return word.charAt(0).toUpperCase() + word.slice(1)  
   }

   const dispatch = useDispatch()
   const { orderAccount } = useSelector((state) => state.order)
   const [status,setStatus] = useState()
   
   const handleChangeStatus=({data,status})=>{
    dispatch(changeOrderStatus({id:data.id,status:status})).then(()=>{
        message.success("Câp nhật thành công")
        dispatch(getOrderAdmin())
    }).catch()

    // setSelectStatus(data.status)
   }
   useEffect   (() => {
      dispatch(getAccountOrders())
   }, [])

//    const statusCode=["Đang xử lý","Đang giao", "Thành công"," Đã hủy"]

   const colorStatus=["magenta","green","red"]

   console.log("abc",orderAccount );

   // const data = orderAdmin?.map((item, index) => ({
   //    key: index+1,
   //    id: item?.id,
   //    status: item?.status,
   //    price: item?.total_price,
   //    quantity:item?.order_details?.[0]?.quantity,
   //    name:item?.order_details?.[0]?.product?.name,
   //    user:item?.user.full_name,
   //    address:item?.address,
   // }))

   const data =[{
      numberOrderSuccess : orderAccount.numberOrderSuccess,
      numberOrderFail : orderAccount.numberOrderFail,
      numberOrderDelevery : orderAccount.numberOrderDelevery,
      numberOrderWait : orderAccount.numberOrderWait,
      total : orderAccount.total
   }]

   const totalOrders = [ 
      {
         title: 'Tổng đơn hàng thành công',
         dataIndex: 'numberOrderSuccess',
         key: 'numberOrderSuccess',
      },
      {
         title: 'Tổng đơn hàng đã hủy',
         dataIndex: 'numberOrderFail',
         key: 'numberOrderFail',
      },
      {
         title: 'Tổng đơn hàng đang vận chuyển',
         dataIndex: 'numberOrderDelevery',
         key: 'numberOrderDelevery',
      },
      {
         title: 'Tổng đơn hàng đang chờ xác nhận',
         dataIndex: 'numberOrderWait',
         key: 'numberOrderWait',
      },

      {
         title: 'Tổng tiền',
         dataIndex: 'total',
         key: 'total',
      },
      {
         title: '',
         dataIndex: 'action',
         key: 'action',
         render: (_, record) => (
            <Space size="small">
               <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
               <Popconfirm title="delete this record?" onConfirm={() => handleDelete(record)}>
                  <Button icon={<DeleteOutlined />} type="dashed"></Button>
               </Popconfirm>
               <Button icon={<InfoCircleOutlined />} onClick={() => handleView(record)}></Button>
            </Space>
         ),
      },
   ]

  return (
    <div>
          <div className="list-products" style={{marginBottom:"30px"}}>
             <Widget background={'#0EBC4E'} title={'Tổng đơn hàng thành công'} price={orderAccount.numberOrderSuccess}/>
             <Widget background={'#F8415D'} title={'Tổng đơn hàng đã hủy'} price={orderAccount.numberOrderFail}/>
          </div>
          <div className="list-products" style={{marginBottom:"30px"}}>
             <Widget background={'#EFB837'} title={'Tổng đơn hàng đang vận chuyển'} price={orderAccount.numberOrderDelevery}/>
             <Widget background={'#20AEDE'} title={'Tổng đơn hàng đang chờ xác nhận'} price={orderAccount.numberOrderWait}/>
          </div>
             <Widget background={'#ED7E01'} title={'Tổng doanh thu trong tuần'} price={orderAccount.total + " VND"}/>
   
    </div>
  )
}

export default AccountOrders