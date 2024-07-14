import { Grid, Skeleton, Container } from '@mantine/core';

const card = <Skeleton height={250} radius="md" />;
const pagination = <Skeleton height={100} radius="md" />;

export const RoomsSkeleton = () => (
  <Container my="xl">
    <Grid>
      <Grid.Col span={{ base: 12, xs: 3 }}>{card}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 3 }}>{card}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 3 }}>{card}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 3 }}>{card}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 12 }}>{pagination}</Grid.Col>
    </Grid>
  </Container>
);
