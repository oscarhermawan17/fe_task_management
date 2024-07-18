export type TaskFormData = {
  id: number | undefined;
  title: string;
  description: string;
  status: string;
}

export type TaskFormProps = {
  onSubmit: (data: TaskFormData) => void;
  defaultValues?: TaskFormData;
}