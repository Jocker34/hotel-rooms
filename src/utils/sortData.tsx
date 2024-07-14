import { Room } from '@/schemas/roomSchema';

export const sortData = (rooms: Room[], criteria: string): Room[] => {
  const sortedData = [...rooms];

  const sortFunctions: { [key: string]: (a: Room, b: Room) => number } = {
    'name-asc': (a, b) => a.name.localeCompare(b.name),
    'name-desc': (a, b) => b.name.localeCompare(a.name),
    'price-asc': (a, b) => a.price.value - b.price.value,
    'price-desc': (a, b) => b.price.value - a.price.value,
  };

  const sortFunction = sortFunctions[criteria];

  return sortFunction ? sortedData.sort(sortFunction) : sortedData;
};
