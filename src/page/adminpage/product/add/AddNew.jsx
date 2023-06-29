// import { yupResolver } from '@hookform/resolvers/yup'
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
// import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
// import { Button, Input, Select, Upload, message } from 'antd'
// import ImgCrop from 'antd-img-crop'
// import React, { useEffect, useState } from 'react'
// import { Controller, useForm } from 'react-hook-form'
// import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import * as yup from 'yup'
// import Layout from '../../../layout/Layout'
// import './style.scss'
// import { useDispatch, useSelector } from 'react-redux'
// import { getCategory } from '../../../redux/slice/caregorySlice'
// import { getProductById, updateProducts } from '../../../redux/slice/productSlice'
// import { addProducts } from '../../../redux/slice/productSlice'
// const { TextArea } = Input

const AddNew = () => {
   const { id } = useParams()
   // const location = useLocation()
   // const navigate = useNavigate()
   // const dispatch = useDispatch()
   // const titleList = location.pathname.slice(1)
   // const breadCrum = titleList.split('/')

   // const [messageApi, contextHolder] = message.useMessage()
   // const { productById } = useSelector((state) => state.product)
   // const { listCategory } = useSelector((state) => state.category)

   // const onSearch = (value) => {
   //    console.log('search:', value)
   // }



   // const schema = yup
   //    .object({
   //       name: yup.string().required('Product is required'),
   //       categoryId: yup.number().required('Category is required'),
   //       description: yup.string().required('Description is required'),
   //       intro: yup.string().required('Intro is required'),
   //    })
   //    .required()
   // const {
   //    control,
   //    handleSubmit,
   //    formState: { errors },
   //    reset,
   // } = useForm({
   //    resolver: yupResolver(schema),
   //    defaultValues: {
   //       name: '',
   //       categoryId: '',
   //       description: '',
   //       intro: '',
   //    },
   // })
   // function capitalizeFirstLetter(word) {
   //    return word.charAt(0).toUpperCase() + word.slice(1)
   // }
   // const [size, setSize] = useState('large')
   // const [fileList, setFileList] = useState([])
   // const idImage = fileList?.map((items) => items?.response?.data?.id)

   // const onChange = ({ fileList: newFileList }) => {
   //    setFileList(newFileList)
   //    console.log(newFileList)
   // }
   // useEffect(() => {
   //    dispatch(getCategory())
   //    if (id) {
   //       dispatch(getProductById(id)).then((data) => {
   //          setFileList(data.payload.data.imageUrls)
   //          // reset({ fileList: data.payload.data.imageUrls })
   //          reset(data.payload.data, { imageFileIds: data?.payload?.data?.imageUrls })
   //       })
   //    }
   // }, [id])
   // console.log(fileList)

   // const onPreview = async (file) => {
   //    let src = file.url
   //    if (!src) {
   //       src = await new Promise((resolve) => {
   //          const reader = new FileReader()
   //          reader.readAsDataURL(file.originFileObj)
   //          reader.onload = () => resolve(reader.result)
   //       })
   //    }
   //    const image = new Image()
   //    image.src = src
   //    const imgWindow = window.open(src)
   //    imgWindow?.document.write(image.outerHTML)
   // }
   // const onSubmit = (data) => {
   //    data.imageFileIds = idImage
   //    data.type = 'PRODUCT'
   //    data.lang = 'en'
   //    if (id) {
   //       dispatch(updateProducts(data))
   //          .then(() => {
   //             console.log('ảnh', data)
   //             messageApi.open({
   //                type: 'success',
   //                content: 'Success!!!',
   //             })
   //             reset()
   //             setFileList([])
   //             navigate('/product')
   //          })
   //          .catch((err) => {
   //             message.error(err)
   //          })
   //    } else {
   //       dispatch(addProducts(data))
   //          .then(() => {
   //             messageApi.open({
   //                type: 'success',
   //                content: 'Success!!!',
   //             })
   //             reset()
   //             setFileList([])
   //             navigate('/product')
   //          })
   //          .catch((err) => {
   //             message.error(err)
   //          })
   //    }
   // }
   // const listCate = listCategory.map((cate) => ({
   //    label: cate.name,
   //    value: cate.id,
   // }))
   // const success = () => {
   //    messageApi.open({
   //       type: 'success',
   //       content: 'Success!!!',
   //    })
   // }

   return (
      // <Layout>
      //    {contextHolder}
      //    <div className="add-products">
      //       <div className="header-add">
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
      //       <form onSubmit={handleSubmit(onSubmit)}>
      //          <div className="content-add-product">
      //             <div className="content-product-left">
      //                <div className="input">
      //                   <div className="title">Product name</div>
      //                   <Controller
      //                      name={'name'}
      //                      control={control}
      //                      render={({ field }) => (
      //                         <Input
      //                            className="input-product"
      //                            placeholder={'Please typing your product name...'}
      //                            {...field}
      //                            control={control}
      //                         />
      //                      )}
      //                   ></Controller>
      //                   <p className="error">{errors.name?.message}</p>
      //                </div>
      //                <div className="category">
      //                   <div className="title">Category</div>
      //                   <Controller
      //                      control={control}
      //                      name="categoryId"
      //                      render={({ field }) => (
      //                         <Select
      //                            {...field}
      //                            control={control}
      //                            style={{ width: '300px' }}
      //                            size="large"
      //                            placeholder="Select a category"
      //                            options={listCate}
      //                            defaultValuevalue={'category'}
      //                         />
      //                      )}
      //                   ></Controller>
      //                   <p className="error">{errors.categoryId?.message}</p>
      //                </div>
      //                <div className="description">
      //                   <div className="title">Description</div>
      //                   <Controller
      //                      name="description"
      //                      control={control}
      //                      render={({ field }) => <TextArea rows={8} {...field} placeholder="Description of product ..." />}
      //                   ></Controller>
      //                   <p className="error">{errors.description?.message}</p>
      //                </div>
      //                <div className="description">
      //                   <div className="title">Intro</div>
      //                   <Controller
      //                      name="intro"
      //                      control={control}
      //                      render={({ field }) => <TextArea rows={8} {...field} placeholder="Intro of product ..." />}
      //                   ></Controller>
      //                   <p className="error">{errors.intro?.message}</p>
      //                </div>
      //             </div>
      //             <div className="content-product-right">
      //                <div className="title">Product images </div>
      //                <div className="content-right">
      //                   <ImgCrop rotationSlider className="upload">
      //                      <Controller
      //                         control={control}
      //                         name="imageFileIds"
      //                         render={({ filed }) => (
      //                            <Upload
      //                               {...filed}
      //                               action="https://portal.smiletech.vn/api/v1/file/upload-single"
      //                               listType="picture-card"
      //                               fileList={fileList}
      //                               onChange={onChange}
      //                               onPreview={onPreview}
      //                            >
      //                               {fileList.length < 5 && '+ Upload'}
      //                            </Upload>
      //                         )}
      //                      ></Controller>
      //                   </ImgCrop>

      //                   <div className="btn">
      //                      <Button type="primary" size={size} htmlType="submit">
      //                         {id ? 'Update Product' : 'Add Product'}
      //                      </Button>
      //                   </div>
      //                </div>
      //             </div>
      //          </div>
      //       </form>
      //    </div>
      // </Layout>
      <>Add product</>
   )
}

export default AddNew
