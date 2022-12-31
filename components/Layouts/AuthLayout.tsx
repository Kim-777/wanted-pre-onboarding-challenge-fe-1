import React from "react";
import DefaultLayout from "./DefaultLayout";
import styles from "./AuthLayout.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import { getTokenAtLocalStorage } from "utils/localStorage";
import { useRouter } from "next/router";
import Loading from "components/Loading";

const cx = classNames.bind(styles);

type Props = {} & {
  children?: React.ReactNode;
};
const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const token = getTokenAtLocalStorage();
    if (token) {
      router.replace("/");
      return;
    }

    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <DefaultLayout>
      <Link
        className={cx({ button: true })}
        href="/"
        title="인덱스 페이지 가기"
      >
        메인 페이지로 가기
      </Link>
      <div className={cx({ wrapper: true })}>{children}</div>
    </DefaultLayout>
  );
};

export default AuthLayout;
