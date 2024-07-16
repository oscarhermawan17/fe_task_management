export type Task = {
  title: string;
  description: string;
  status: string;
}

export type TaskItemProps = {
  task: Task;
}