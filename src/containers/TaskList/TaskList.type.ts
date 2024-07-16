export type TaskFormData = {
  title: string;
  description: string;
  status: string;
}

export type Task = TaskFormData & {
  id: number;
}

