import { Box, Button, Typography } from '@mui/material';

import Styles from './TaskItem.style'
import type { TaskItemProps } from './TaskItem.type'

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <Box sx={Styles.boxWrapper}>
      <Typography variant="body1" sx={Styles.title}>{task.title}</Typography>
      <Typography variant="subtitle2" sx={Styles.description}>{task.description}</Typography>
      <Button variant="contained" onClick={() => null} fullWidth>Edit</Button>
    </Box>
  );
};

export default TaskItem;
