type DefaultForm = {
  title: string;
  description: string;
  status: string;
}

export type TaskFormWithIdUndefined = DefaultForm & {
  id: undefined;
}

export type TaskFormData = DefaultForm & {
  id: number;
}

