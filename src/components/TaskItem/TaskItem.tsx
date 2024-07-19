import { memo } from 'react'
import { Box, Button, Typography } from '@mui/material';

import Styles from './TaskItem.style'
import type { TaskItemProps } from './TaskItem.type'

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, status, onDelete, openModalUpdate }) => {
  return (
    <Box sx={Styles.boxWrapper}>
      <Typography variant="body1" sx={Styles.title}>{title}</Typography>
      <Typography variant="subtitle2" sx={Styles.description}>{description}</Typography>
      <Button variant="contained" sx={Styles.buttonSpaceTop} onClick={() => openModalUpdate({ id, title, description, status })} fullWidth>Edit</Button>
      <Button variant="contained" color="error" sx={Styles.buttonSpaceTop} onClick={() => onDelete(id)} fullWidth>Delete</Button>
    </Box>
  );
};

export default memo(TaskItem);
