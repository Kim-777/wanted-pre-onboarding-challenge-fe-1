import React from "react";
import styles from "./DetailTodo.module.scss";
import classNames from "classnames/bind";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  getTodoById,
  GetTodoByIdKey,
  GetTodosKey,
  removeTodo,
} from "apis/todos";
import Loading from "components/Loading";
import TodoUpdateForm from "./TodoUpdateForm";
import { checkErrorOfAxios } from "utils/checkErrorOfAxios";
import { Todo } from "types/todos";

const cx = classNames.bind(styles);

const DetailTodo = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModifyMode, setIsModifyMode] = React.useState<boolean>(false);

  const detailQuery = useQuery({
    queryKey: [GetTodoByIdKey(router.query.id as string)],
    queryFn: async () => {
      const result = await getTodoById(router.query.id as string);

      return result;
    },
    enabled: !!router.query.id,
  });

  const removeTodoMutation = useMutation({
    mutationFn: removeTodo,
    onSuccess(data, variable) {
      alert("할일이 삭제되었습니다.");
      queryClient.setQueryData([GetTodosKey], (data: Todo[] | undefined) => {
        return data?.filter((item) => item.id !== variable) as Todo[];
      });
      router.replace("/todos");
    },
    onError(error) {
      if (checkErrorOfAxios(error)) {
        alert(error.response?.data.details);
        return;
      }

      alert("할일 삭제에 실패했습니다.");
    },
  });

  const handleDelete = React.useCallback(() => {
    if (!detailQuery.data) return;
    if (confirm("정말 할일을 삭제하실껀가요?")) {
      removeTodoMutation.mutate(detailQuery.data.id);
    }
  }, [detailQuery.data]);

  console.log("detailQuery.data ::::: ", detailQuery.data);

  if (detailQuery.isLoading) return <Loading />;

  if (detailQuery.error || !detailQuery.data)
    return <div>데이터를 불러오는 데 실패했습니다.</div>;

  return (
    <div className={cx({ wrapper: true })}>
      {!isModifyMode && (
        <div>
          <div>
            <div>타이틀</div>
            <h4>{detailQuery.data.title}</h4>
          </div>

          <div>
            <div>할일 내용</div>
            <div>{detailQuery.data.content}</div>
          </div>

          <div>
            <div>생성일 : {detailQuery.data.createdAt}</div>
            <div>수정일 : {detailQuery.data.updatedAt}</div>
          </div>

          <div>
            <button
              onClick={() => {
                setIsModifyMode(true);
              }}
            >
              수정
            </button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        </div>
      )}
      {isModifyMode && (
        <TodoUpdateForm
          {...detailQuery.data}
          onBack={() => {
            setIsModifyMode(false);
          }}
        />
      )}
    </div>
  );
};

export default DetailTodo;
