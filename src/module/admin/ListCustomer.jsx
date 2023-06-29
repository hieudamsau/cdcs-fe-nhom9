import React, { useEffect, useState } from 'react'
import { deleteUser, getAllCustomer, getAllUser } from '../../redux/auth/userSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
 import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import {  Popconfirm, Space, Table,Button } from 'antd'
// import Button from '../../components/button/Button'
import { UrlImage } from '../../assets/configImage'
import { green } from '@mui/material/colors'
// import './buttonStyle.scss'

const ListCustomer = () => {
   const location = useLocation()
   const titleList = location.pathname.slice(1)
   const breadCrum = titleList.split('/')
   const navigate = useNavigate()


//    const handleChange = (e) => {
//       setSearchProduct(e.target.value)
//    }
   function capitalizeFirstLetter(word) {
      return word.charAt(0).toUpperCase() + word.slice(1)  
   }

   const dispatch = useDispatch()
   const { allCustomer } = useSelector((state) => state.user)
   useEffect   (() => {
      dispatch(getAllCustomer())
   }, [])

   console.log(allCustomer);
   const data = allCustomer?.map((item, index) => ({
      key: index,
      avatar: item?.avatar,
      full_name: item?.full_name,
      email: item?.email,
      phone: item?.phone,
      address : item?.address,
      dob : item?.dob,
      id:item.id
   }))

   const columns = [ 
      {
         title: 'Avatar',
         dataIndex: 'avatar',
         key: 'avatar',
         render: (avatar) => <img src={UrlImage(avatar) ||
            "https://lh3.googleusercontent.com/ZQFbZeosDa1ODQnaaunB72fejXPcl_hg7rfEcgVlZSkgtOTAHQH1M4RxVrH2cLN6gjqJvOAq1b8CeE92gjqDN2W3b2HsMkxb=rw"} alt="Ảnh" width={50} />,
      },
      {
         title: 'Tên',
         dataIndex: 'full_name',
         key: 'full_name',
      },
      {
        title: 'Ngày sinh',
        dataIndex: 'dob',
        key: 'dob',
     },
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
      },
      {
         title: 'Số điện thoại',
         dataIndex: 'phone',
         key: 'phone',
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
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
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
         title: 'a',
         dataIndex: 'action',
         key: 'action',
         render: (_, record) => (
            <Space size="small">
               <Button icon={<EditOutlined />} bg={"primary"} onClick={() => handleEdit(record)}></Button>
               <Popconfirm title="delete this record?" onConfirm={() => handleDelete(record)}>
                  <Button icon={<DeleteOutlined />} type="dashed"></Button>
               </Popconfirm>
               {/* <Button icon={<InfoCircleOutlined />} onClick={() => handleView(record)}></Button> */}
            </Space>
         ),
      },
   ]

   const handleEdit = (item) => {
      navigate(`/admin/edit-customer/${item.id}`)
   }
   const handleDelete = (item) => {
    console.log("xoa",item);
    dispatch(deleteUser(item.id)).then((data)=>{
       console.log("data",data);
       if(data.payload.status===200){
    dispatch(getAllUser())
       }
    })
 }
   const handleView = () => {
      console.log('view')
   }
   const handleClickAdd = () => {
      navigate('/admin/add-user')
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
             <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
             <div className="list-control">
                {/* <Search className="home-search" value={searchProduct} onChange={handleChange} /> */}
                {/* <Button></Button> */}
                {/* <Button  className="Button" label={'AddNew'} color={' #2196f3'} icon="Thêm NV" onClick={handleClickAdd} type={'submit'} /> */}
                {/* <Button  onClick={handleClickAdd} type="primary" >Thêm nhân viên</Button> */}
                <Button onClick={handleClickAdd} style={{background:"blue",color:"white",padding:"8px 8px",fontSize:"12px",height:"45px"}}  htmlType="submit">
                            Thêm Khách hàng
               </Button>
             </div>
          </div>
          
    </div>
  )
}

export default ListCustomer