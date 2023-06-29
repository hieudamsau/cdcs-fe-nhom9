import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../components/button/Button";
import Checkbox from "../components/checkbox/Checkbox";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Label from "../components/label/Label";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register, registerUser } from "../redux/auth/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const schema = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  phone: yup
    .number()
    .required("Vui lòng nhập số điện thoại"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Tối thiểu 8 ký tự")
    .max(30, "Vượt quá 30 ký tự cho phép"),
});

const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }, []);

  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      const data = {
        email: values.email,
        password: values.password,
        phone: values.phone,
        gender:1,
        avatar:null,
      };
      const action = registerUser(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log(user);
      toast.dismiss();
      toast.success("Đăng ký tài khoản thành công", { pauseOnHover: false });
      reset({
        fullname: "",
        email: "",
        password: "",
        retypePassword: "",
        term: false,
      });
      // navigate("/verify");
    } catch (error) {
      toast.dismiss();
      toast.error(error.message, { pauseOnHover: false });
    }
  };

  return (
    <AuthenticationPage>
      <form autoComplete="off" onSubmit={handleSubmit(handleSignUp)}>
       

        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Mời bạn nhập email"
            control={control}
          />
          {errors.email && (
            <p className="text-red-500 text-base font-medium">
              {errors.email?.message}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="password">Mật khẩu</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
          {errors.password && (
            <p className="text-red-500 text-base font-medium">
              {errors.password?.message}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="phone">Phone</Label>
          <Input
            placeholder="Mời bạn nhập số điện thoại"
            control={control}
            name="phone"
          ></Input>
          {errors.phone && (
            <p className="text-red-500 text-base font-medium">
              {errors.phone?.message}
            </p>
          )}
        </Field>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disable={isSubmitting}
          style={{
            width: "100%",
            maxWidth: 250,
            margin: "30px auto",
            height: "50px",
            backgroundColor:"#ff7023"
          }}
        >
          Đăng ký
        </Button>
      </form>
      <Field>
        <div className="flex items-center mx-auto pb-10">
          {" "}
          <span className="text-black text-base">
            Bạn đã có tài khoản? &nbsp;
          </span>
          <Link to="/sign-in" className="text-lg text-[#ED7E01] font-semibold">
            Đăng nhập
          </Link>
        </div>
      </Field>
    </AuthenticationPage>
  );
};

export default SignUpPage;
