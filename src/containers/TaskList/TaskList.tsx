import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Box, CircularProgress, Button, Modal } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Grid from "@mui/system/Unstable_Grid"
import axios from 'axios';

import { fakeDataStatus, fakeDataCards } from './TaskListData'
import TaskForm from '../../components/TaskForm';
import type { TaskFormData } from './TaskList.type'
import Styles from './TaskList.style';

const TaskItem = lazy(() => import('../../components/TaskItem'));

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskFormData[]>([...fakeDataCards]);
  const [statusCard, _] = useState([...fakeDataStatus ])
  const [modalForm, setModalForm] = useState(false)
  const [defaultUpdatedValues, setDefaultUpdatedValues] = useState<TaskFormData | undefined>(undefined)

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id: string) => {
    const deleteSelectedTask = tasks.filter(task => task.id !== id)
    setTasks(deleteSelectedTask)
  }

  const openModal = (id: string) => {
    const taskValue = tasks.find(task => task.id === id)
    if(taskValue === undefined) {
      setDefaultUpdatedValues(undefined)
    } else {
      setDefaultUpdatedValues({
        id: id,
        title: taskValue.title,
        description: taskValue.description,
        status: taskValue.status
      })
    }
    setModalForm(true)
  }

  const closeAndReset = () => {
    setDefaultUpdatedValues(undefined)
    setModalForm(false)
  }

  const submitTask = (newTask: TaskFormData) => {
    if(newTask.id) {
      const updateTask = tasks.map(task => task.id === newTask.id ? newTask : task)
      setTasks(updateTask)
    } else {
      setTasks((prevState) => [...prevState, {
        ...newTask,
        id: uuidv4(),
      }])
    }
    closeAndReset()
  };

  const cardList = (status: string) => {
    return (
      <Grid container spacing={1}>
        {tasks.filter(filterTask => filterTask.status === status).map(task => (
          <Grid xs={6} key={task.id}>
            <TaskItem key={task.id} task={task} onDelete={handleDelete} openModalForm={openModal}/>
          </Grid>
        ))}
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
     
      <Modal open={modalForm} onClose={() => closeAndReset()}>
        <Box sx={Styles.wrapperBoxModal}>
          <Box sx={Styles.titleModal}>Add Form</Box>
          <TaskForm onSubmit={submitTask} defaultValues={defaultUpdatedValues}/>
        </Box>
      </Modal>
    </Box>
  );
};

export default TaskList;
