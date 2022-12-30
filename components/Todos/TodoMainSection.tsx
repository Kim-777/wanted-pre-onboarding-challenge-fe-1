import React from "react";
import TodoForm from "./TodoForm";
import styles from "./TodoMainSection.module.scss";
import classNames from "classnames/bind";
import TodoUpdateForm from "./TodoUpdateForm";
import DetailTodo from "./DetailTodo";

const cx = classNames.bind(styles);

type Props = {
  detail?: boolean;
};

const TodoMainSection = ({ detail }: Props) => {
  return (
    <div className={cx({ wrapper: true })}>
      {!detail && <TodoForm />}
      {detail && <DetailTodo />}
    </div>
  );
};

export default TodoMainSection;
