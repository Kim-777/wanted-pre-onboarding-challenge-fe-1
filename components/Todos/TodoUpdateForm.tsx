import InputWithAlert from "components/Forms/Inputs/InputWithAlert";
import React from "react";
import { useForm } from "react-hook-form";
import { Todo } from "types/todos";
import styles from "./TodoForm.module.scss";
import classNames from "classnames/bind";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetTodosKey, postTodo, putTodo } from "apis/todos";
import { checkErrorOfAxios } from "utils/checkErrorOfAxios";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

type Inputs = Pick<Todo, "title" | "content">;

const TodoUpdateForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const putTodoMutation = useMutation({
    mutationFn: async (requestBody: Inputs) => {
      const result = await putTodo(router.query.id as string, requestBody);

      return result;
    },
    onSuccess() {
      alert("투두 리스트 수정 성공");
      queryClient.invalidateQueries({ queryKey: [GetTodosKey] });
      reset();
    },
    onError(error) {
      if (checkErrorOfAxios(error)) {
        alert(error.response?.data.details);
        return;
      }

      alert("투두 수정에 실패했습니다.");
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    handleSubmit((requestBody) => {
      putTodoMutation.mutate(requestBody);
    }),
    []
  );

  const GuideSpans = {
    title() {
      if (errors.title) {
        return (
          <span className={cx({ errorText: true })}>
            {errors.title.message}
          </span>
        );
      }
      return null;
    },

    content() {
      if (errors.content) {
        return (
          <span className={cx({ errorText: true })}>
            {errors.content.message}
          </span>
        );
      }

      return null;
    },
  };

  React.useEffect(() => {
    if (!router.isReady) return;

    setValue("title", router.query.title as string);
    setValue("content", router.query.content as string);
  }, [router]);

  return (
    <div>
      <form onSubmit={onSubmit} className={cx({ form: true })}>
        <h3>할일을 수정해주세요.</h3>
        <InputWithAlert
          type="text"
          placeholder="제목을 입력하세요."
          label="제목"
          alert={GuideSpans.title()}
          {...register("title", { required: "제목을 작성해주세요." })}
        />
        <InputWithAlert
          type="text"
          label="내용"
          placeholder="내용을 입력하세요"
          alert={GuideSpans.content()}
          {...register("content", { required: "내용을 입력하세요." })}
        />
        <div>
          <button
            disabled={
              !watch("content" || !watch("title")) || putTodoMutation.isLoading
            }
            type="submit"
            className={cx({ form_btn: true })}
          >
            수정하기
          </button>
          <button
            className={cx({ form_btn: true })}
            onClick={() => {
              router.replace(`/todos/${router.query.id}`);
            }}
            type="button"
          >
            디테일 페이지 가기
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoUpdateForm;
