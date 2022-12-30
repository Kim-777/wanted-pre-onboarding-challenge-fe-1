import { restApi } from "apis";
import { Todo } from "types/todos";

export const GetTodosKey = "/todos";
export const PostTodoKey = "/todos";
export const GetTodoByIdKey = (id: string) => `/todos/${id}`;
export const PutTodoKey = (id: string) => `/todos/${id}`;
export const DeleteTodoKey = (id: string) => `/todos/${id}`;

export const getTodos = async () => {
  const { data } = await restApi.get<Todo[]>(GetTodosKey);
  return data;
};

export const getTodoCountOnly = async () => {
  const { data } = await restApi.get<number>(GetTodosKey, {
    params: {
      countOnly: "true",
    },
  });
  return data;
};

export const getTodoById = async (id: string) => {
  const { data } = await restApi.get<Todo>(GetTodoByIdKey(id));
  return data;
};

export const postTodo = async (
  requestBody: Pick<Todo, "title" | "content">
) => {
  const { data } = await restApi.post(PostTodoKey, requestBody);

  return data;
};

export const putTodo = async (
  id: string,
  requestBody: Pick<Todo, "title" | "content">
) => {
  const { data } = await restApi.put<Todo>(PutTodoKey(id), requestBody);

  return data;
};

export const removeTodo = async (id: string) => {
  const { data } = await restApi.delete(DeleteTodoKey(id));
  console.log("removeTodo :::: ", data);
  return data;
};
