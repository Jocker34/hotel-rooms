import { useState } from 'react';
import { Pagination, Grid, Container, Select } from '@mantine/core';
import { useRooms } from '@/hooks/useRooms';
import { RoomCard } from '@/components/RoomCard/RoomCard';
import { sortData } from '@/utils/sortData';
import { RoomsSkeleton } from './RoomsSkeleton';
import { Error } from '@/components/Error/Error';

const chunk = <T,>(array: T[], size: number): T[][] => {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
};

export const Rooms: React.FC = () => {
  const { data, isPending, isError } = useRooms();
  const [activePage, setPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState<string>('price-asc');

  const handleSortChange = (value: string | null) => {
    value && setSortCriteria(value);
  };

  if (isPending) {
    return <RoomsSkeleton />;
  }

  if (isError || !data) {
    return <Error />;
  }

  const sortedData = sortData(data, sortCriteria);
  const paginatedData = chunk(sortedData, 4);
  const items = paginatedData[activePage - 1]?.map((item) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 6, xl: 3 }} key={item.id}>
      <RoomCard name={item.name} price={item.price} id={item.id} />
    </Grid.Col>
  ));

  return (
    <Container size="90%">
      <Grid justify="flex-end">
        <Select
          value={sortCriteria}
          onChange={handleSortChange}
          data={[
            { value: 'name-asc', label: 'Name (A-Z)' },
            { value: 'name-desc', label: 'Name (Z-A)' },
            { value: 'price-asc', label: 'Price (Low to High)' },
            { value: 'price-desc', label: 'Price (High to Low)' },
          ]}
          placeholder="Sort by"
          mb="md"
          data-testid="select"
        />
      </Grid>
      <Grid gutter="md">{items}</Grid>
      <Grid
        justify="center"
        mt="sm"
        style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}
      >
        <Pagination total={paginatedData.length} value={activePage} onChange={setPage} />
      </Grid>
    </Container>
  );
};
