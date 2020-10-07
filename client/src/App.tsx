import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import TopBar from './components/TopBar';
import WorkoutList from './pages/workout/List';
import WorkoutDetail from './pages/workout/Detail';

export default function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <TopBar />
        <Box mt={4} mb={2}>
          <Switch>
            <Route path="/workouts" component={WorkoutList} />
            <Route path="/workout/:id" component={WorkoutDetail} />
            <Route path="/">
              <Redirect to="/workouts" />
            </Route>
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}