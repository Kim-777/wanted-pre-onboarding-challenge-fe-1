import OnlyLoginUserAvailableLayout from "components/Layouts/OnlyLoginUserAvailableLayout";
import TodoListSection from "components/Todos/TodoListSection";
import TodoMainSection from "components/Todos/TodoMainSection";
import styles from "./todo.module.scss";
import classNames from "classnames/bind";
import { NextPageWithLayout } from "pages/_app";
import React from "react";

const cx = classNames.bind(styles);

const ModifyTodo: NextPageWithLayout = () => {
  return (
    <div className={cx({ wrapper: true })}>
      <TodoListSection />
      <TodoMainSection pageStatus="modify" />
    </div>
  );
};

export default ModifyTodo;

ModifyTodo.getLayout = (page) => {
  return <OnlyLoginUserAvailableLayout>{page}</OnlyLoginUserAvailableLayout>;
};
