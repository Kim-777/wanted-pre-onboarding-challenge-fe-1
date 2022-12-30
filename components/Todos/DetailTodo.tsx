import React from "react";
import styles from "./DetailTodo.module.scss";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getTodoById, GetTodoByIdKey } from "apis/todos";
import Loading from "components/Loading";
import TodoUpdateForm from "./TodoUpdateForm";

const cx = classNames.bind(styles);

const DetailTodo = () => {
  const router = useRouter();
  const [isModifyMode, setIsModifyMode] = React.useState<boolean>(false);
  const detailQuery = useQuery({
    queryKey: [GetTodoByIdKey(router.query.id as string)],
    queryFn: async () => {
      const result = await getTodoById(router.query.id as string);

      return result;
    },
    enabled: !!router.query.id,
  });

  console.log("detailQuery.data ::::: ", detailQuery.data);

  if (detailQuery.isLoading) return <Loading />;

  if (detailQuery.error || !detailQuery.data)
    return <div>데이터를 불러오는 데 실패했습니다.</div>;

  return (
    <div className={cx({ wrapper: true })}>
      {!isModifyMode && (
        <div>
          <h4>{detailQuery.data.title}</h4>
          <div>
            <div>{detailQuery.data.content}</div>
            <div>{detailQuery.data.createdAt}</div>
            <div>{detailQuery.data.updatedAt}</div>
          </div>

          <div>
            <button
              onClick={() => {
                setIsModifyMode(true);
              }}
            >
              수정
            </button>
            <button>삭제</button>
          </div>
        </div>
      )}
      {isModifyMode && <TodoUpdateForm {...detailQuery.data} />}
    </div>
  );
};

export default DetailTodo;
