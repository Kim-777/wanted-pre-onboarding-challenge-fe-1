import AuthLayout from "components/Layouts/AuthLayout";
import { NextPageWithLayout } from "pages/_app";
import React from "react";

const SignUp: NextPageWithLayout = () => {
  return <div>SignUp</div>;
};

export default SignUp;

SignUp.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
