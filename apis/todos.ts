import { restApi } from "apis";
import { ReturnData, Todo } from "types/todos";

export const GetTodosKey = "/todos";
export const PostTodoKey = "/todos";
export const GetTodoByIdKey = (id: string) => `/todos/${id}`;
export const PutTodoKey = (id: string) => `/todos/${id}`;
export const DeleteTodoKey = (id: string) => `/todos/${id}`;

export const getTodos = async () => {
  const { data } = await restApi.get<ReturnData<Todo[]>>(GetTodosKey);
  return data.data.reverse();
};

export const getTodoCountOnly = async () => {
  const { data } = await restApi.get<ReturnData<number>>(GetTodosKey, {
    params: {
      countOnly: "true",
    },
  });
  return data;
};

export const getTodoById = async (id: string) => {
  const { data } = await restApi.get<ReturnData<Todo>>(GetTodoByIdKey(id));
  return data.data;
};

export const postTodo = async (
  requestBody: Pick<Todo, "title" | "content">
) => {
  const { data } = await restApi.post<ReturnData<Todo>>(
    PostTodoKey,
    requestBody
  );
  console.log("post !!! ::: ", data);

  return data.data;
};

export const putTodo = async (
  id: string,
  requestBody: Pick<Todo, "title" | "content">
) => {
  const { data } = await restApi.put<ReturnData<Todo>>(
    PutTodoKey(id),
    requestBody
  );

  return data;
};

export const removeTodo = async (id: string) => {
  const { data } = await restApi.delete(DeleteTodoKey(id));
  console.log("removeTodo :::: ", data);
  return data;
};
