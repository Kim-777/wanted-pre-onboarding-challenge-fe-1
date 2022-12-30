import React from "react";
import styles from "./TodoListItem.module.scss";
import classNames from "classnames/bind";
import { Todo } from "types/todos";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const cx = classNames.bind(styles);

type Props = Todo;

const TodoListItem = ({ title, id, content, createdAt, updatedAt }: Props) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push({ pathname: `/todos/${id}` });
      }}
      className={cx({ wrapper: true })}
    >
      <div className={cx({ list_item: true })}>할일: {title}</div>
      <div className={cx({ list_item: true })}>디테일: {content}</div>
      <div className={cx({ list_item: true })}>
        생성일: {dayjs(createdAt).format("YYYY. MM. DD HH:mm")}
      </div>
      <div className={cx({ list_item: true })}>수정일: {updatedAt}</div>
    </button>
  );
};

export default React.memo(TodoListItem);
