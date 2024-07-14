import { Title, Text, Container, Group } from '@mantine/core';
import classes from './Error.module.css';

export const Error = () => (
  <Container className={classes.root}>
    <div className={classes.label}>Error</div>
    <Title className={classes.title}>Something went wrong.</Title>
    <Text c="dimmed" size="lg" ta="center" className={classes.description}>
      Please contact your administrator or try refreshing the page.
    </Text>
    <Group justify="center"></Group>
  </Container>
);
