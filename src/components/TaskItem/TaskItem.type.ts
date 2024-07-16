export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
}

export type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  openModalForm: (id: string) => void;
}