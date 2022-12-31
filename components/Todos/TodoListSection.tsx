import React from "react";
import styles from "./TodoListSection.module.scss";
import classNames from "classnames/bind";
import TodoListItem from "./TodoListItem";
import Link from "next/link";
import { Todo } from "types/todos";
import { useQuery } from "@tanstack/react-query";
import { getTodos, GetTodosKey } from "apis/todos";
import Loading from "components/Loading";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const TodoListSection = () => {
  const router = useRouter();
  const todosQuery = useQuery({
    queryKey: [GetTodosKey],
    queryFn: getTodos,
  });

  console.log("todosQuery.data :::::: ", todosQuery.data);
  console.log("todosQuery.data :::: ", todosQuery.data);

  if (todosQuery.isLoading) return <Loading />;

  return (
    <div className={cx({ wrapper: true })}>
      <button
        onClick={() => {
          router.push("/todos");
        }}
        className={cx({ create_btn: true })}
      >
        새로운 TODO 만들기
      </button>
      <Link
        href="/"
        title="인덱스 페이지 가기"
        className={cx({ go_main_btn: true })}
      >
        메인페이지 가기
      </Link>
      <div className={cx({ list_wrapper: true })}>
        {!!todosQuery.data && todosQuery.data.length > 0 ? (
          todosQuery.data.map((todo) => <TodoListItem {...todo} />)
        ) : (
          <div className={cx({ empty_todo: true })}>
            작성된 투두리스트가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoListSection;
