import InputWithAlert from "components/Forms/Inputs/InputWithAlert";
import React from "react";
import { useForm } from "react-hook-form";
import { Todo } from "types/todos";
import styles from "./TodoForm.module.scss";
import classNames from "classnames/bind";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetTodosKey, postTodo } from "apis/todos";
import { checkErrorOfAxios } from "utils/checkErrorOfAxios";

const cx = classNames.bind(styles);

type Inputs = Pick<Todo, "title" | "content">;

const TodoForm = () => {
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const postTodoMutation = useMutation({
    mutationFn: postTodo,
    onSuccess() {
      alert("투두 리스트 작성 성공");
      queryClient.invalidateQueries({ queryKey: [GetTodosKey] });
    },
    onError(error) {
      if (checkErrorOfAxios(error)) {
        alert(error.response?.data.details);
        return;
      }

      alert("투두 작성에 실패했습니다.");
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    handleSubmit((requestBody) => {
      console.log("requestBody ::::: ", requestBody);
      postTodoMutation.mutate(requestBody);
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

  return (
    <div>
      <form onSubmit={onSubmit} className={cx({ form: true })}>
        <h4>할일을 작성해주세요.</h4>
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
        <button
          disabled={!watch("content" || !watch("title"))}
          type="submit"
          className={cx({ form_btn: true })}
        >
          작성하기
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
