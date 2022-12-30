import React from "react";
import DefaultLayout from "./DefaultLayout";
import styles from "./AuthLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {} & {
  children?: React.ReactNode;
};
const AuthLayout = ({ children }: Props) => {
  return (
    <DefaultLayout>
      <div className={cx({ wrapper: true })}>{children}</div>
    </DefaultLayout>
  );
};

export default AuthLayout;
