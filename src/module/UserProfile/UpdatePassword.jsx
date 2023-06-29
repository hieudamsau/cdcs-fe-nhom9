import React from "react";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import InputPasswordToggle from "../../components/input/InputPasswordToggle";
import DashboardHeading from "../dashboard/DashboardHeding";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../components/button/Button";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    ,
  new_password: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    ,
  passwordConfirm: yup
    .string()
      .required("Vui lòng nhập lại mật khẩu")
      .oneOf([yup.ref("new_password")], "Xác nhận mật khẩu chưa đúng"),
});

const UpdatePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    reset,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (current === null) {
  //     toast.dismiss();
  //     toast.warning("Vui lòng đăng nhập");
  //     navigate("/sign-in");
  //   }
  // }, [current]);

  const handleReset = async (values) => {
    console.log("values",values);
    if (!isValid) return;
    try {
      const response = await userApi.changePasswordUser({password:values.password,new_password:values.new_password});
      console.log("res",response);
      if(response.status===200){

        toast.dismiss();
        toast.success("Đổi mật khẩu thành công");
      }else{
        toast.dismiss();
        toast.success("Đổi mật khẩu thất bại");

      }
        reset({
          new_password: "",
          password: "",
          passwordConfirm: "",
      });
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-white rounded-lg">
      <DashboardHeading
        title="Đổi mật khẩu"
        className="px-5 py-5"
      ></DashboardHeading>
      <form className="pb-16" onSubmit={handleSubmit(handleReset)}>
        <Field>
          <Label htmlFor="password">Mật khẩu hiện tại</Label>
          <InputPasswordToggle
            control={control}
            name="password"
          ></InputPasswordToggle>
          {errors.password && (
            <p className="text-red-500 text-base font-medium">
              {errors.password?.message}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="new_password">Mật khẩu mới</Label>
          <InputPasswordToggle
            control={control}
            name="new_password"
          ></InputPasswordToggle>
          {errors.new_password && (
            <p className="text-red-500 text-base font-medium">
              {errors.new_password?.message}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="passwordConfirm">Nhập lại mật khẩu mới</Label>
          <InputPasswordToggle
            control={control}
            name="passwordConfirm"
          ></InputPasswordToggle>
          {errors.passwordConfirm && (
            <p className="text-red-500 text-base font-medium">
              {errors.passwordConfirm?.message}
            </p>
          )}
        </Field>

        <Button
          kind="primary"
          className="mx-auto w-[200px] mt-10"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          height="50px"
        >
          <span className="text-black border border-green-500 p-5 rounded-lg font-medium"> Đổi mật khẩu</span>
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
