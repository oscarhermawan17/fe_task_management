export type TaskItemProps = {
  id: number | undefined;
  title: string;
  description: string;
  onDelete: (id: number | undefined) => Promise<void>;
  openModalForm: (id: number | undefined) => void;
}