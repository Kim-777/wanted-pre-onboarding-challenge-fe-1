import Loading from "components/Loading";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { getTokenAtLocalStorage } from "utils/localStorage";
import DefaultLayout from "./DefaultLayout";

type Props = {
  children?: React.ReactNode;
};

const OnlyLoginUserAvailableLayout = ({ children }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const token = getTokenAtLocalStorage();

    if (!token) {
      router.replace("/");
      return;
    }

    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return <DefaultLayout>{children}</DefaultLayout>;
};

export default OnlyLoginUserAvailableLayout;
