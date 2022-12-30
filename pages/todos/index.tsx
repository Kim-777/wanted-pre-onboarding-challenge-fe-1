import TodoListSection from "components/Todos/TodoListSection";
import TodoMainSection from "components/Todos/TodoMainSection";
import React from "react";
import styles from "./todos.module.scss";
import classNames from "classnames/bind";
import { Todo } from "types/todos";
import { NextPageWithLayout } from "../_app";
import OnlyLoginUserAvailableLayout from "components/Layouts/OnlyLoginUserAvailableLayout";
import AuthLayout from "components/Layouts/AuthLayout";

const cx = classNames.bind(styles);

const Todos: NextPageWithLayout = () => {
  return (
    <div className={cx({ wrapper: true })}>
      <TodoListSection />
      <TodoMainSection pageStatus="create" />
    </div>
  );
};

export default Todos;

Todos.getLayout = (page) => {
  return <OnlyLoginUserAvailableLayout>{page}</OnlyLoginUserAvailableLayout>;
};
