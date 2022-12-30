import AuthLayout from "components/Layouts/AuthLayout";
import { NextPageWithLayout } from "pages/_app";
import React from "react";

const Login: NextPageWithLayout = () => {
  return <div>Login</div>;
};

export default Login;

Login.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
