import React from "react";
import TodoForm from "./TodoForm";
import styles from "./TodoMainSection.module.scss";
import classNames from "classnames/bind";
import TodoUpdateForm from "./TodoUpdateForm";
import DetailTodo from "./DetailTodo";

const cx = classNames.bind(styles);

export type EnabledTodoMainPage = "create" | "detail" | "modify";

type Props = {
  pageStatus: EnabledTodoMainPage;
};

const TodoMainSection = ({ pageStatus }: Props) => {
  return (
    <div className={cx({ wrapper: true })}>
      {pageStatus === "create" && <TodoForm />}
      {pageStatus === "detail" && <DetailTodo />}
      {pageStatus === "modify" && <TodoUpdateForm />}
    </div>
  );
};

export default TodoMainSection;
