import AuthLayout from "components/Layouts/AuthLayout";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import styles from "./signup.module.scss";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import InputWithAlert from "components/Forms/Inputs/InputWithAlert";
import { emailRegex } from "common/regex";
import { useMutation } from "@tanstack/react-query";
import { login, signUp } from "apis/auth";
import { setTokenToLocalStorage } from "utils/localStorage";
import { checkErrorOfAxios } from "utils/checkErrorOfAxios";
import { useRouter } from "next/router";
import { setTokenToAxiosHeader } from "apis";

const cx = classNames.bind(styles);

type Inputs = {
  email: string;
  password: string;
};

const Login: NextPageWithLayout = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess({ token, message }) {
      alert(message);
      setTokenToAxiosHeader(token);
      setTokenToLocalStorage(token);
      router.replace("/");
    },
    onError(error) {
      if (checkErrorOfAxios(error)) {
        alert(error.response?.data.details);
        return;
      }
      alert("로그인에 실패했습니다. 잠시 후에 시도해주세요.");
    },
  });

  const GuideSpans = {
    email() {
      if (errors.email) {
        return (
          <span className={cx({ errorText: true })}>
            {errors.email.message}
          </span>
        );
      }
      return null;
    },

    password() {
      if (errors.password) {
        return (
          <span className={cx({ errorText: true })}>
            {errors.password.message}
          </span>
        );
      }

      return null;
    },
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    handleSubmit(({ email, password }) => {
      loginMutation.mutate({ email, password });
    }),
    []
  );

  const disabled = !watch("email") || !watch("password");

  return (
    <form className={cx({ wrapper: true })} onSubmit={onSubmit}>
      <InputWithAlert
        label="이메일"
        type="email"
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
        type="password"
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
      <button
        type="submit"
        disabled={disabled}
        className={cx({ form_button: true })}
      >
        로그인하기
      </button>
    </form>
  );
};

export default Login;

Login.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
