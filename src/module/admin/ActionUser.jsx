import { Button, Input, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ImgCrop from 'antd-img-crop'
import { UrlImage } from '../../assets/configImage'
import { addUserAdmin, getUserById, updateUserAdmin } from '../../redux/auth/userSlice'
const { TextArea } = Input

const ActionUser = () => {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const titleList = location.pathname.slice(1)
    const breadCrum = titleList.split('/')
 
    const { UserById } = useSelector((state) => state.user)
 
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
          full_name: '',
          email: '',
          phone: '',
          password: '',
          role : 2
       },
    })
    function capitalizeFirstLetter(word) {
       return word.charAt(0).toUpperCase() + word.slice(1)
    }
    const [size, setSize] = useState('large')
    const [fileList, setFileList] = useState([])
 
    const onChange = ({ fileList: newFileList }) => {
       setFileList(newFileList)
    }
    const [avatar,setAvatar] =useState()
    useEffect(() => {
       if (id) {
          dispatch(getUserById(id)).then(data =>{
            console.log("data",data);
            // setFileList(data.payload.data.avatar)
            setAvatar(data.payload.data.avatar)
            reset(data.payload.data)
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
       if (id) {
      //   data.avatar=data_avatar
        console.log("update",data);
          dispatch(updateUserAdmin(data))
             .then(() => {
                console.log('ảnh', data)
                reset()
                setFileList([])
                navigate('/admin/users')
             })
             .catch((err) => {
                message.error(err)
             })
       } else {
        data.avatar=res1
          dispatch(addUserAdmin(data))
             .then(() => {
                reset()
                setFileList([])
                navigate('/admin/users')
             })
             .catch((err) => {
                message.error(err)
             })
       }
    }
    const success = () => {
      
    }
 console.log("id",id);
    return (
       <>
          <div className="add-users">
             {/* <div className="header-add">
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
             </div> */}
             <form onSubmit={handleSubmit(onSubmit)}>
                <div className="content-add-product">
                   <div className="content-product-left">
                     
                      <div className="input">
                         <div className="title">Tên</div>
                         <Controller
                            name={'full_name'}
                            control={control}
                            render={({ field }) => (
                               <Input
                                  className="input-user"
                                  placeholder={'Please typing users name'}
                                  {...field}
                                  control={control}
                               />
                            )}
                         ></Controller>
                      </div>
                
                      <div className="email">
                         <div className="title">Email</div>
                         <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <TextArea rows={2} {...field} placeholder="Email người dùng" />}
                         ></Controller>
                      </div>
                      <div className="phone">
                         <div className="title">Số điện thoại</div>
                         <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => <TextArea rows={2} {...field} placeholder="Số điện thoại người dùng" />}
                         ></Controller>
                      </div>

                     {id?(<></>):(  <div className="password">
                         <div className="title">Mật khẩu</div>
                         <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <TextArea rows={2} {...field} placeholder="Mật Khẩu người dùng" />}
                         ></Controller>
                      </div>)}
                    
                      <div className="address">
                         <div className="title">Địa chỉ</div>
                         <Controller
                            name="address"
                            control={control}
                            render={({ field }) => <TextArea rows={2} {...field} placeholder="Địa chỉ" />}
                         ></Controller>
                      </div>
                   </div>
                   <div className="content-product-right">
                      <div className="title">Avatar</div>
                      <div className="content-right">
                        {id ==undefined ? (<>
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

                      
                        </>):(<>
                        <img src={UrlImage( avatar)} alt="" width="100px"/>
                        </>)
                           
                        }
                   
 
                         <div className="btn">
                            <Button style={{background:"blue",color:"white"}} size={size} htmlType="submit">
                               {id ? 'Cập nhật ' : 'Thêm '}
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
 
 export default ActionUser
 