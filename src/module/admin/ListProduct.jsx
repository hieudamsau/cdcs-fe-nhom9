import React, { useEffect, useState } from 'react'
import { deleteProducts, getProduct } from '../../redux/product/productSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
 import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import { Button, Popconfirm, Space, Table } from 'antd'
import './buttonStyle.scss'
import { UrlImage } from '../../assets/configImage'
import Button1 from '../../components/button/Button'


const ListProduct = () => {
   const location = useLocation()
   const titleList = location.pathname.slice(1)
   const breadCrum = titleList.split('/')
   const navigate = useNavigate()
   const [searchProduct, setSearchProduct] = useState()

   const handleChange = (e) => {
      setSearchProduct(e.target.value)
   }
   function capitalizeFirstLetter(word) {
      return word.charAt(0).toUpperCase() + word.slice(1)  
   }

   const dispatch = useDispatch()
   const { product } = useSelector((state) => state.product)
   useEffect   (() => {
      dispatch(getProduct())
   }, [])

   console.log("product",product);

   const data = product?.map((item, index) => ({
      key: index,
      imageUrl: item?.image_url,
      name: item?.name,
      price: item?.price,
      description: item?.description,
      quantity: item?.quantity,
      type : item?.type,
      id:item.id
   }))
   const handleDelete = (item) => {
      console.log("xoa",item);
      dispatch(deleteProducts(item.id)).then((data)=>{
         console.log("data",data);
         if(data.payload.status===200){
      dispatch(getProduct())
         }
      })
   }
   const columns = [ 
      {
         title: 'Ảnh',
         dataIndex: 'imageUrl',
         key: 'imageUrl',
         render: (img) => <img src={UrlImage(img?.[0]?.url) ||
            "https://lh3.googleusercontent.com/ZQFbZeosDa1ODQnaaunB72fejXPcl_hg7rfEcgVlZSkgtOTAHQH1M4RxVrH2cLN6gjqJvOAq1b8CeE92gjqDN2W3b2HsMkxb=rw"} alt="Ảnh" width={50} />,
      },
      {
         title: 'Tên',
         dataIndex: 'name',
         key: 'name',   
      },
      {
         title: 'Số lượng',
         dataIndex: 'quantity',
         key: 'quantity',
      },
      {
         title: 'Loại',
         dataIndex: 'type',
         key: 'type',
      },
      {
         title: 'Giá',
         dataIndex: 'price',
         key: 'price',
         render: (text) => (
            <div
               style={{
                  textOverflow: 'ellipsis',
                  maxWidth: '300px',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 3,
               }}
            >
               {text}
            </div>
         ),
      },
      {
         title: 'Mô tả',
         dataIndex: 'description',
         key: 'description',
         render: (text) => (
            <div
               style={{
                  textOverflow: 'ellipsis',
                  maxWidth: '400px',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 3,
               }}
            >
               {text}
            </div>
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
               {/* <Button icon={<InfoCircleOutlined />} onClick={() => handleView(record)}></Button> */}
            </Space>
         ),
      },
   ]

   const handleEdit = (item) => {
      navigate(`/admin/edit-product/${item.id}`)
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
                {/* <div className="bread-crum">
                   <HomeOutlinedIcon className="icon" onClick={() => navigate('/')} />
                   {'Home'}
                   <NavigateNextOutlinedIcon className="icon" />
                   {breadCrum.map((item, index) => (
                      <div key={index} className="sub-breadCrum">
                         {capitalizeFirstLetter(item)}
                         <NavigateNextOutlinedIcon className="icon" />
                      </div>
                   ))}
                </div> */}
             </div>
             <div className="list-control">
                {/* <Search className="home-search" value={searchProduct} onChange={handleChange} /> */}

                <Button1 onClick={handleClickAdd} style={{background:"green" ,height:"40px"}}> Thêm </Button1>
                {/* <Button  label={'AddNew'} color={' #2196f3'} icon="add" onClick={handleClickAdd} type={'submit'} /> */}
             </div>
             <Table dataSource={data} columns={columns} pagination={{ pageSize: 4 }} />
          </div>
   
    </div>
  )
}

export default ListProduct