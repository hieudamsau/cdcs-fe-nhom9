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
import { changeOrderStatus, getOrder, getOrderAdmin } from '../../redux/order/orderSlice'
const ListOrder = () => {
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
   const { orderAdmin } = useSelector((state) => state.order)
   const [status,setStatus] = useState()
   
   const handleChangeStatus=({data,status})=>{
    dispatch(changeOrderStatus({id:data.id,status:status})).then(()=>{
        message.success("Câp nhật thành công")
        dispatch(getOrderAdmin())
    }).catch()

    // setSelectStatus(data.status)
   }
   useEffect   (() => {
      dispatch(getOrderAdmin())
   }, [])

//    const statusCode=["Đang xử lý","Đang giao", "Thành công"," Đã hủy"]

   const colorStatus=["magenta","green","red"]

   console.log("order",status);

   const data = orderAdmin?.map((item, index) => ({
      key: index+1,
      id: item?.id,
      status: item?.status,
      price: item?.total_price,
      quantity:item?.order_details?.[0]?.quantity,
      name:item?.order_details?.[0]?.product?.name,
      user:item?.user.full_name,
      address:item?.address,
   }))


   const columns = [ 
      {
         title: 'Id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Stt',
         dataIndex: 'key',
         key: 'key',
      },
      {
         title: 'Tên đơn hàng',
         dataIndex: 'name',
         key: 'name',
           render: (text) => (
            <p
               style={{
                  textOverflow: 'ellipsis',
                  maxWidth: '100px',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 3,
               }}
            >
               {text}
            </p>
         ),
      },
      {
         title: 'Số lượng',
         dataIndex: 'quantity',
         key: 'quantity',
      },
      {
         title: 'Giá',
         dataIndex: 'price',
         key: 'price',
       
      },
      {
         title : 'Người đặt',
         dataIndex: 'user',
         key: 'user',
      },
      {
         title : 'Địa chỉ',
         dataIndex: 'address',
         key: 'address',
      },
      {
         title: 'Trạng thái',
         render: (_, record) => (
            <Select
            style={{
             padding:"6px 6px"
            }}
            defaultValue={record?.status}
            onChange={(e)=>{
                handleChangeStatus({data:record,status:e}) 
            }}>
            <Option value={0}>Đang xử lý</Option>
            <Option value={1}>Đang giao</Option>
            <Option value={2}>Thành công</Option>
            <Option value={3}>Đã hủy</Option>
         </Select>
         ),
        
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

   const handleEdit = (item) => {
    console.log("item",item);
      navigate(`/admin/edit-order/${item.id}`)
   }
   const handleDelete = ({ id }) => {
      dispatch(deleteProducts(id)).then(() => {
         dispatch(getProducts('PRODUCT'))
      })
   }
   const handleView = () => {
      console.log('view')
   }
   const handleClickAdd = () => {
      navigate('/admin/add-product')
   }
   const { control, handleSubmit } = useForm()

  return (
    <div>
          <div className="list-products">
             <div className="heading-products">
              
             </div>
             <div className="list-control">
                <Button  label={'AddNew'} color={' #2196f3'} icon="add" onClick={handleClickAdd} type={'submit'} />
             </div>
             <Table dataSource={data} columns={columns} pagination={{ pageSize: 4 }} />
          </div>
   
    </div>
  )
}

export default ListOrder