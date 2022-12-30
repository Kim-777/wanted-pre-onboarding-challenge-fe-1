export type Todo = {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
};

export type ReturnData<T> = {
  data: T;
};
