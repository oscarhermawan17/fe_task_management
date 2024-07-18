
import { useState, useEffect } from 'react';
import { Container, Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import TaskList from "../../containers/TaskList"
import Styles from './HomePage.style';



const HomePage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    if(token === null) {
      navigate("/login")
    }
  }, [token])

  const handleClearToken = () => {
    localStorage.removeItem('token');
    setToken(null)
  };

  if(token === null) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="xl">
      <TaskList token={token} />
      <Box sx={Styles.buttonLogOut}>
        <Button variant="contained" onClick={handleClearToken}>Log Out</Button>
      </Box>
    </Container>
    
  )
}

export default HomePage;