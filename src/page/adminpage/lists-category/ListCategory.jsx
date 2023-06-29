import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import { Button, Popconfirm, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import CustomButton from '../../components/button/Button'
import Search from '../../components/search/Search'
import Layout from '../../layout/Layout'
import { getProducts } from '../../redux/slice/homeSlice'
import '../lists-product/style.scss'
const ListCategory = () => {
   const location = useLocation()
   const titleList = location.pathname.slice(1)
   const breadCrum = titleList.split('/')
   const navigate = useNavigate()

   function capitalizeFirstLetter(word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
   }

   const dispatch = useDispatch()
   const { listProducts } = useSelector((state) => state.home)

   useEffect(() => {
      dispatch(getProducts())
   }, [])

   const data = listProducts?.map((item, index) => ({
      key: index,
      productId: item?.productId,
      imageUrl: item?.imageUrl,
      name: item?.name,
      description: item?.description,
   }))

   const columns = [
      {
         title: 'Products Id',
         dataIndex: 'productId',
         key: 'productId',
      },
      {
         title: 'Image',
         dataIndex: 'imageUrl',
         key: 'imageUrl',
         render: (img) => <img src={img} alt="Ảnh" width={50} />,
      },
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Description',
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
         title: 'Action',
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

   const handleEdit = () => {
      console.log('edit')
      setIsModalOpen(true)
   }
   const handleDelete = () => {
      console.log('delete')
   }
   const handleView = () => {
      console.log('view')
      setIsModalOpen(true)
      // navigate('/products/3213')
   }
   const handleClickAdd = () => {
      navigate('/product/add-new-product')
   }
   const { control, handleSubmit } = useForm()
   return (
      <Layout>
         <div className="list-products">
            <div className="heading-products">
               <div className="bread-crum">
                  <HomeOutlinedIcon className="icon" onClick={() => navigate('/')} />
                  {'Home'}
                  <NavigateNextOutlinedIcon className="icon" />
                  {breadCrum.map((item, index) => (
                     <div key={index} className="sub-breadCrum">
                        {capitalizeFirstLetter(item)}
                        <NavigateNextOutlinedIcon className="icon" />
                     </div>
                  ))}
               </div>
            </div>
            <div className="list-control">
               <Search className="home-search" />
               <CustomButton label={'AddNew'} color={' #2196f3'} icon="add" onClick={handleClickAdd} type={'submit'} />
            </div>
            <Table dataSource={data} columns={columns} pagination={{ pageSize: 3 }} />
         </div>
      </Layout>
   )
}

export default ListCategory
