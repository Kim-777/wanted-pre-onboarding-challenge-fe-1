import InputWithAlert from "components/Forms/Inputs/InputWithAlert";
import React from "react";
import { useForm } from "react-hook-form";
import { Todo } from "types/todos";
import styles from "./TodoForm.module.scss";
import classNames from "classnames/bind";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetTodosKey, postTodo } from "apis/todos";
import { checkErrorOfAxios } from "utils/checkErrorOfAxios";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

type Inputs = Pick<Todo, "title" | "content">;

type Props = {};

// TODO 수정 페이지 완성하고 스타일 꾸며주기
const TodoUpdateForm = ({}: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
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
            disabled={!watch("content" || !watch("title"))}
            type="submit"
            className={cx({ form_btn: true })}
          >
            작성하기
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
