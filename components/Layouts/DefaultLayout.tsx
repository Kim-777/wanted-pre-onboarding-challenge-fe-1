import React from "react";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {} & {
  children?: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  return <div className={cx({ wrapper: true })}>{children}</div>;
};

export default DefaultLayout;
