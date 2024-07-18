import { Suspense, lazy, useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Button, Modal } from '@mui/material';
import Grid from "@mui/system/Unstable_Grid"
import axios from 'axios';

import { fakeDataStatus } from './TaskListData'
import TaskForm from '../../components/TaskForm';
import type { TaskFormData } from './TaskList.type'
import Styles from './TaskList.style';

const TaskItem = lazy(() => import('../../components/TaskItem'));

const TaskList = ({ token } : { token:  string | null }) => {
  const [tasks, setTasks] = useState<TaskFormData[]>([]);
  const [statusCard, _] = useState([...fakeDataStatus ])
  const [modalForm, setModalForm] = useState(false)
  const [defaultUpdatedValues, setDefaultUpdatedValues] = useState<TaskFormData | undefined>(undefined)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => setTasks(response.data))
    .catch(error => console.error(error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 204) {
        const deleteSelectedTask = tasks.filter(task => task.id !== id)
        setTasks(deleteSelectedTask)
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  const openModal = (id: number) => {
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

  const submitTask = async (newTask: TaskFormData) => {
    // If have ID, it should be Update
    if(newTask.id) {
      try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${newTask.id}`, {
          title: newTask.title,
          description: newTask.description,
          status: newTask.status
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updateTask = tasks.map(task => task.id === newTask.id ? {
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          status: response.data.status
        } : task)
        setTasks(updateTask)
      } catch (error) {
        console.error('Error while updating task:', error);
      }
    // If doesnt have ID, should be create new task
    } else {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, {
            title: newTask.title,
            description: newTask.description,
            status: newTask.status
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTasks((prevState) => [...prevState, {
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            status: response.data.status
          }])
        } catch (error) {
          console.error('Error creating task:', error);
        }
    }
    closeAndReset()
  };

  const cardList = (status: string) => {
    return (
      <Grid container spacing={1}>
        {tasks.filter(filterTask => filterTask.status === status).map(task => (
          <Grid md={6} xs={12} key={task.id}>
            <TaskItem key={task.id} task={task} onDelete={handleDelete} openModalForm={openModal}/>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Container maxWidth="xl">
      <Box sx={Styles.buttonAddTask}>
        <Button variant="contained" onClick={() => setModalForm(true)}>Add Task</Button>
      </Box>
      <Grid container spacing={4} sx={Styles.wrapperGridTaskList}>
        {statusCard.map((status, index) => (
          <Grid key={index} md={4} xs={12} sx={Styles.wrapperTaskListStatus}>
            <Box sx={Styles.taskListStatus}>{status}</Box>
            <Suspense fallback={<CircularProgress />}>
              {cardList(status)}
            </Suspense>
          </Grid>
        ))}
      </Grid>
     
      <Modal open={modalForm} onClose={() => closeAndReset()}>
        <Box sx={Styles.wrapperBoxModal}>
          <Box sx={Styles.titleModal}>Task Form</Box>
          <TaskForm onSubmit={submitTask} defaultValues={defaultUpdatedValues}/>
        </Box>
      </Modal>
    </Container>
  );
};

export default TaskList;
