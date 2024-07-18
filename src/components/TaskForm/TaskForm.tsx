import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, TextField, Button, Select, MenuItem, FormControl, FormHelperText, InputLabel } from '@mui/material';

import Styles from './TaskForm.style'
import { fakeDataStatus as statusData } from '../../containers/TaskList'
import type { TaskFormProps, TaskFormData } from './TaskForm.type'

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({ defaultValues });
  const handleFormSubmit: SubmitHandler<TaskFormData> = data => {
    const sanitizedData = {
      id: defaultValues?.id ? defaultValues.id : undefined,
      title: data.title.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
      description: data.description.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
      status: data.status
    };
    onSubmit(sanitizedData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <TextField
        label="Title"
        {...register('title', { required: true })}
        error={!!errors.title}
        helperText={errors.title && 'Title is required'}
        fullWidth
        size="small"
        sx={Styles.spaceTop}
      />

      <TextField
        label="Description"
        {...register('description', { required: true })}
        error={!!errors.description}
        helperText={errors.description && 'Description is required'}
        fullWidth
        size="small"
        sx={Styles.spaceTop}
      />

      <FormControl fullWidth error={!!errors.status} size="small" sx={Styles.spaceTop}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          label="Status"
          {...register('status', { required: 'Status is required' })}
          defaultValue={defaultValues?.status}
        >
          {statusData.map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
        {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
      </FormControl>

      <Button sx={Styles.spaceTop} variant="contained" type="submit" fullWidth>Submit</Button>
    </Box>
  );
};

export default TaskForm;
