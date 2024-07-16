import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Box, CircularProgress, Button, Modal } from '@mui/material';
import Grid from "@mui/system/Unstable_Grid"
import axios from 'axios';

import { fakeDataStatus, fakeDataCards } from './TaskListData'
import TaskForm from '../../components/TaskForm';
import type { Task, TaskFormData } from './TaskList.type'
import Styles from './TaskList.style';

const TaskItem = lazy(() => import('../../components/TaskItem'));

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([...fakeDataCards]);
  const [statusCard, _] = useState([...fakeDataStatus ])
  const [modalForm, setModalForm] = useState(false)

  const handleAddTask = (newTask: TaskFormData) => {
    setTasks((prevState) => [...prevState, {
      id: prevState.length + 1,
      ...newTask
    }])
    setModalForm(false);
  };

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const cardList = (status: string) => {
    return (
      <Grid container spacing={1}>
          {tasks.filter(filterTask => filterTask.status === status)
            .map(task => (
              <Grid xs={6}>
                <TaskItem key={task.id} task={task} />
              </Grid>))}
      </Grid>
    )
  }

  return (
    <Box sx={Styles.wrapper}>
      <Box sx={Styles.buttonAddTask}>
        <Button variant="contained" onClick={() => setModalForm(true)}>Add Task</Button>
      </Box>
      <Grid container spacing={4} sx={Styles.wrapperGridTaskList}>
        {statusCard.map((status, index) => (
          <Grid key={index} xs={4} sx={Styles.wrapperTaskListStatus}>
            <Box sx={Styles.taskListStatus}>{status}</Box>
            <Suspense fallback={<CircularProgress />}>
              {cardList(status)}
            </Suspense>
          </Grid>
        ))}
      </Grid>
     
      <Modal open={modalForm} onClose={() => setModalForm(false)}>
        <Box sx={Styles.wrapperBoxModal}>
          <Box sx={Styles.titleModal}>Add Form</Box>
          <TaskForm onSubmit={handleAddTask}/>
        </Box>
      </Modal>
    </Box>
  );
};

export default TaskList;
