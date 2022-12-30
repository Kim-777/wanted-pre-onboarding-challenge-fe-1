import AuthLayout from "components/Layouts/AuthLayout";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import styles from "./signup.module.scss";
import classNames from "classnames/bind";
import { SubmitHandler, useForm } from "react-hook-form";
import InputWithAlert from "components/Forms/Inputs/InputWithAlert";
import { emailRegex } from "common/regex";

const cx = classNames.bind(styles);

type Inputs = {
  email: string;
  password: string;
  passwordCheck: string;
};

const SignUp: NextPageWithLayout = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
    },
  });

  const GuideSpans = {
    email() {
      if (errors.email) {
        return (
          <span style={{ color: "red", fontSize: "14px" }}>
            {errors.email.message}
          </span>
        );
      }
      return null;
    },

    password() {
      if (errors.password) {
        return (
          <span style={{ color: "red", fontSize: "14px" }}>
            {errors.password.message}
          </span>
        );
      }

      return null;
    },
    passwordCheck() {
      if (errors.passwordCheck) {
        return (
          <span style={{ color: "red", fontSize: "14px" }}>
            {errors.passwordCheck.message}
          </span>
        );
      }

      return null;
    },
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    handleSubmit((e) => {
      console.log("e ::::: ", e);
    }),
    []
  );

  const disabled =
    !watch("email") || !watch("password") || !watch("passwordCheck");

  return (
    <form className={cx({ wrapper: true })} onSubmit={onSubmit}>
      <InputWithAlert
        label="이메일"
        alert={GuideSpans.email()}
        {...register("email", {
          required: "이메일은 필수입니다.",
          pattern: {
            value: emailRegex,
            message: "알맞은 형식의 이메일을 입력해주세요.",
          },
        })}
      />
      <InputWithAlert
        label="비밇번호"
        alert={GuideSpans.password()}
        {...register("password", {
          required: "비밀번호를 입력해주세요",
          maxLength: {
            value: 16,
            message: "비밀번호는 16자리를 이하로 입력하세요.",
          },
          minLength: {
            value: 8,
            message: "비밀번호는 8자리 이상으로 입력하세요.",
          },
        })}
      />
      <InputWithAlert
        label="비밀번호 체크"
        alert={GuideSpans.passwordCheck()}
        {...register("passwordCheck", {
          required: "비밀번호 확인을 입력해주세요.",
          validate: (checkPassword) =>
            checkPassword === getValues("password") ||
            "비밀번호가 일치하지 않습니다",
        })}
      />
      <button
        type="submit"
        disabled={disabled}
        className={cx({ form_button: true })}
      >
        회원가입하기
      </button>
    </form>
  );
};

export default SignUp;

SignUp.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
