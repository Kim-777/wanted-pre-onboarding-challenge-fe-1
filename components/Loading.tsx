import React from "react";
import styles from "./Loading.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Loading = () => {
  return (
    <div className={cx({ wrapper: true })}>
      <span>페이지 로딩 중</span>
    </div>
  );
};

export default Loading;
