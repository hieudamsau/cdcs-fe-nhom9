// import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
// import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
// import { Button, Popconfirm, Space, Table } from 'antd'
// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useDispatch, useSelector } from 'react-redux'
// import { useLocation, useNavigate } from 'react-router-dom'
// import HomeApi from '../../apis/HomeApi'
// import CustomButton from '../../components/button/Button'
// import Search from '../../components/search/Search'
// import useYouTubeLoading from '../../hooks/loading/useYouTubeLoading'
// import Layout from '../../layout/Layout'
// import './style.scss'
// import ProductApi from '../../apis/ProductApi'
// import { deleteProducts, getProducts } from '../../redux/slice/productSlice'
const List = () => {
   const location = useLocation()
   const titleList = location.pathname.slice(1)
   const breadCrum = titleList.split('/')
   const navigate = useNavigate()
   const [searchProduct, setSearchProduct] = useState()
   const { isLoading, error } = useYouTubeLoading(ProductApi.getProduct)

   const handleChange = (e) => {
      setSearchProduct(e.target.value)
   }
   function capitalizeFirstLetter(word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
   }

   const dispatch = useDispatch()
   const { listProducts } = useSelector((state) => state.product)
   useEffect(() => {
      dispatch(getProducts('PRODUCT'))
   }, [])

   const data = listProducts?.map((item, index) => ({
      key: index,
      productId: item?.productId,
      imageUrl: item?.imageUrl,
      name: item?.name,
      intro: item?.intro,
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
         title: 'Intro',
         dataIndex: 'intro',
         key: 'intro',
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
               {/* <Button icon={<InfoCircleOutlined />} onClick={() => handleView(record)}></Button> */}
            </Space>
         ),
      },
   ]

   const handleEdit = (item) => {
      navigate(`/product/edit-new-product/${item.productId}`)
   }
   const handleDelete = ({ productId }) => {
      dispatch(deleteProducts(productId)).then(() => {
         dispatch(getProducts('PRODUCT'))
      })
   }
   const handleView = () => {
      console.log('view')
   }
   const handleClickAdd = () => {
      navigate('/product/add-new-product')
   }
   const { control, handleSubmit } = useForm()

   return (
      // <Layout>
      //    {isLoading && <div className="loading-bar" />}
      //    <div className="list-products">
      //       <div className="heading-products">
      //          <div className="bread-crum">
      //             <HomeOutlinedIcon className="icon" onClick={() => navigate('/')} />
      //             {'Home'}
      //             <NavigateNextOutlinedIcon className="icon" />
      //             {breadCrum.map((item, index) => (
      //                <div key={index} className="sub-breadCrum">
      //                   {capitalizeFirstLetter(item)}
      //                   <NavigateNextOutlinedIcon className="icon" />
      //                </div>
      //             ))}
      //          </div>
      //       </div>
      //       <div className="list-control">
      //          <Search className="home-search" value={searchProduct} onChange={handleChange} />
      //          <CustomButton label={'AddNew'} color={' #2196f3'} icon="add" onClick={handleClickAdd} type={'submit'} />
      //       </div>
      //       <Table dataSource={data} columns={columns} pagination={{ pageSize: 4 }} />
      //    </div>
      // </Layout>
      <>List product</>
   )
}

export default List
