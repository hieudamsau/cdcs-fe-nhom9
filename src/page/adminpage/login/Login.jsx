import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../../../components/button/Button'
import { login } from '../../../redux/auth/userSlice'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import './style.scss'
import { message } from 'antd'
const Login = () => {
   const schema = Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
   })
   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm({
      resolver: yupResolver(schema),
   })
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const onSubmit = (data) => {
      dispatch(login(data))
         .then(() => {
            navigate('/')
         })
         .catch((err) => {
            message.error(err)
         })
   }
   return (
      <div className="bt-form-login-simple-1">
         <div className="img" style={{ textAlign: 'center' }}>
            {/* <img src={img} alt="" /> */}
         </div>
         <h1 className="form-heading">Welcome to SmileTech</h1>
         <p className="form-desc">“Technology for Happiness”</p>
         <form className="form" autoComplete="off">
            <div className="form-group">
               <label htmlFor="">Email</label>
               <input type="text" className="formInput" placeholder="Enter your email" {...register('email')} />
               {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
            </div>
            <div className="form-group">
               <label htmlFor="">Password</label>
               <input type="password" className="formInput" placeholder="Enter your password" {...register('password')} />
               {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
            </div>
            <div className="buttonLogin" style={{ marginTop: '60px' }}>
               <CustomButton label={'Login'} color={'#1dc071'} size="large" onClick={handleSubmit(onSubmit)} />
            </div>
         </form>
      </div>
   )
}

export default Login
