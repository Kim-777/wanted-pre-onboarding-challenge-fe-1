import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import React from "react";
import {
  getTokenAtLocalStorage,
  removeTokenAtLocalStorage,
} from "utils/localStorage";
import Link from "next/link";
import Loading from "components/Loading";

const cx = classNames.bind(styles);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLogged, setIsLogged] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const token = getTokenAtLocalStorage();

    if (token) {
      setIsLogged(true);
      return;
    }

    setIsLogged(false);
  }, []);

  if (typeof isLogged !== "boolean") return <Loading />;

  return (
    <>
      <Head>
        <title>원티드 프리온보딩 과제</title>
        <meta name="description" content="원티드 프리온보딩" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cx({ wrapper: true })}>
        {isLogged ? (
          <button
            onClick={() => {
              removeTokenAtLocalStorage();
              setIsLogged(false);
            }}
            className={cx({ button: true })}
          >
            로그아웃
          </button>
        ) : (
          <>
            <Link
              href="/auth/login"
              title="로그인 가기"
              className={cx({ button: true })}
            >
              로그인
            </Link>
            <Link
              href="/auth/signup"
              title="회원가입 가기"
              className={cx({ button: true })}
            >
              회원가입
            </Link>
          </>
        )}

        <Link href="/todos" className={cx({ button: true })}>
          투두 리스트
        </Link>
      </div>
    </>
  );
}
