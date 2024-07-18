export type Task = {
  id: number | undefined;
  title: string;
  description: string;
  status: string;
}

export type TaskItemProps = {
  task: Task;
  onDelete: (id: number | undefined) => void;
  openModalForm: (id: number | undefined) => void;
}