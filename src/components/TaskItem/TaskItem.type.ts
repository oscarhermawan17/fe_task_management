type TaskFormData = {
  id: number;
  title: string;
  description: string;
  status: string;
}

export type TaskItemProps = TaskFormData & {
  onDelete: (id: number) => Promise<void>;
  openModalUpdate: (task: TaskFormData) => void;
}