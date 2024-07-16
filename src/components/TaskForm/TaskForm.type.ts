export type TaskFormData = {
  title: string;
  description: string;
  status: string;
}

export type TaskFormProps = {
  onSubmit: (data: TaskFormData) => void;
  defaultValues?: TaskFormData;
}