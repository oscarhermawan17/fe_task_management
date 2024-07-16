import { Box, Button, Typography } from '@mui/material';

import Styles from './TaskItem.style'
import type { TaskItemProps } from './TaskItem.type'

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, openModalForm }) => {
  return (
    <Box sx={Styles.boxWrapper}>
      <Typography variant="body1" sx={Styles.title}>{task.title}</Typography>
      <Typography variant="subtitle2" sx={Styles.description}>{task.description}</Typography>
      <Button variant="contained" sx={Styles.buttonSpaceTop} onClick={() => openModalForm(task.id)} fullWidth>Edit</Button>
      <Button variant="contained" color="error" sx={Styles.buttonSpaceTop} onClick={() => onDelete(task.id)} fullWidth>Delete</Button>
    </Box>
  );
};

export default TaskItem;
