export type Task = {
  id: number | undefined;
  title: string;
  description: string;
  status: string;
}

export type TaskItemProps = {
  task: Task;
  onDelete: (id: number | undefined) => Promise<void>;
  openModalForm: (id: number | undefined) => void;
}