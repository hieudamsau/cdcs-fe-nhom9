import { yupResolver } from '@hookform/resolvers/yup'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import { Button, Input, Select, Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './style.scss'
import { addProducts, getProductId, updateProducts } from '../../redux/product/productSlice'
const { TextArea } = Input

const ActionProduct = () => {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const titleList = location.pathname.slice(1)
    const breadCrum = titleList.split('/')
 
    const { productById } = useSelector((state) => state.product)
 
    const onSearch = (value) => {
       console.log('search:', value)
    }
 

    const {
       control,
       handleSubmit,
       formState: { errors },
       reset,
    } = useForm({
       defaultValues: {
          name: '',
          categoryId: '',
          description: '',
          intro: '',
       },
    })
    function capitalizeFirstLetter(word) {
       return word.charAt(0).toUpperCase() + word.slice(1)
    }
    const [size, setSize] = useState('large')
    const [fileList, setFileList] = useState([])
 
    const onChange = ({ fileList: newFileList }) => {
       setFileList(newFileList)
       console.log(newFileList)
    }
    useEffect(() => {
       if (id) {
          dispatch(getProductId (id)).then((data) => {
             setFileList(data.payload.data.image_url)
             reset(data.payload.data, { imageFileIds: data?.payload?.data?.imageUrls })
          })
       }
    }, [id])
    console.log("file",fileList)

    const res=fileList?.map((item,index)=>item.url)
    const res1=fileList?.[0]?.response?.data?.url
    const data_image=res?.join(";")


 
    const onPreview = async (file) => {
       let src = file.url
       if (!src) {
          src = await new Promise((resolve) => {
             const reader = new FileReader()
             reader.readAsDataURL(file.originFileObj)
             reader.onload = () => resolve(reader.result)
          })
       }
       const image = new Image()
       image.src = src
       const imgWindow = window.open(src)
       imgWindow?.document.write(image.outerHTML)
    }

    const onSubmit = (data) => {

       data.type = 'PRODUCT'
       data.lang = 'en'
       if (id) {
        data.image_url=data_image
          dispatch(updateProducts(data))
             .then(() => {
                console.log('ảnh', data)
                reset()
                setFileList([])
                navigate('/admin/product')
             })
             .catch((err) => {
                message.error(err)
             })
       } else {
        data.image_url=res1
          dispatch(addProducts(data))
             .then(() => {
                reset()
                setFileList([])
                navigate('/admin/product')
             })
             .catch((err) => {
                message.error(err)
             })
       }
    }
    const success = () => {
      
    }
 
    return (
       <>
          <div className="add-products">
             <div className="header-add">
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
             <form onSubmit={handleSubmit(onSubmit)}>
                <div className="content-add-product">
                   <div className="content-product-left">
                      <div className="input">
                         <div className="title">Tên</div>
                         <Controller
                            name={'name'}
                            control={control}
                            render={({ field }) => (
                               <Input
                                  className="input-product"
                                  placeholder={'Please typing your product name...'}
                                  {...field}
                                  control={control}
                               />
                            )}
                         ></Controller>
                      </div>
                
                      <div className="description">
                         <div className="title">Mô tả</div>
                         <Controller
                            name="description"
                            control={control}
                            render={({ field }) => <TextArea rows={8} {...field} placeholder="Description of product ..." />}
                         ></Controller>
                      </div>
                      <div className="description">
                         <div className="title">Giá</div>
                         <Controller
                            name="price"
                            control={control}
                            render={({ field }) => <TextArea rows={2} {...field} placeholder="Intro of product ..." />}
                         ></Controller>
                      </div>
                      <div className="type">
                         <div className="title">Loại</div>
                         <Controller
                            name="type"
                            control={control}
                            render={({ field }) => <TextArea rows={2} {...field} placeholder="type of product ..." />}
                         ></Controller>
                        </div>
                      <div className="description">
                         <div className="title">Số lượng</div>
                         <Controller
                            name="quantity"
                            control={control}
                            render={({ field }) => <TextArea rows={2} {...field} placeholder="Intro of product ..." />}
                         ></Controller>
                      </div>
                   </div>
                   <div className="content-product-right">
                      <div className="title">Product images </div>
                      <div className="content-right">
                         <ImgCrop rotationSlider className="upload">
                            <Controller
                               control={control}
                               name="imageFileIds"
                               render={({ filed }) => (
                                  <Upload
                                     {...filed}
                                     action="http://localhost:3012/uploads/upload-single"
                                     listType="picture-card"
                                     fileList={fileList}
                                     onChange={onChange}
                                     onPreview={onPreview}
                                  >
                                     {fileList?.length < 5 && '+ Upload'}
                                  </Upload>
                               )}
                            ></Controller>
                         </ImgCrop>
 
                         <div className="btn">
                            <Button style={{background:"blue",color:"white"}} size={size} htmlType="submit">
                               {id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                            </Button>
                         </div>
                      </div>
                   </div>
                </div>
             </form>
          </div>
       </>
    )
 }
 
 export default ActionProduct
 