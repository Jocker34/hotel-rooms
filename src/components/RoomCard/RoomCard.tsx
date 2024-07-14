import { Image, Card, Text, Group, Button, Badge, Tooltip, Loader } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useState } from 'react';
import classes from './RoomCard.module.css';
import { useRoom } from '@/hooks/useRoom';

interface RoomCardProps {
  id: number;
  name: string;
  price: {
    currencyCode: string;
    value: number;
  };
}

type status = 'onRequest' | 'available' | 'soldOut' | 'error';

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
];

const getBadgeColor = (status: status): string => {
  const colorMap = {
    onRequest: 'blue',
    available: 'green',
    soldOut: 'red',
    error: 'gray',
  };
  return colorMap[status];
};

export const RoomCard: React.FC<RoomCardProps> = ({ id, name, price }) => {
  const [checkAvailability, setcheckAvailability] = useState(false);
  const [status, setStatus] = useState<status>('onRequest');
  const [newPrice, setNewPrice] = useState<number | null>(null);
  const [roomData, setRoomData] = useState<RoomCardProps | null>(null);
  const { refetch, isError, isLoading } = useRoom(id, false);

  const handleCheckAvailability = async () => {
    try {
      const { data } = await refetch();
      if (data) {
        setcheckAvailability(true);
        setStatus(data.availabilityStatus);
        if (data.price !== null) { setNewPrice(data.price.value); }
        setRoomData({
          id,
          name,
          price: data.price,
        });
      }
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  const handleBookNow = () => {
    if (roomData) {
      console.log('Room Details:');
      console.log(`Room ID: ${roomData.id}`);
      console.log(`Room Name: ${roomData.name}`);
      console.log(`Current Price: ${roomData.price.value}`);
      console.log(`Currency Code: ${roomData.price.currencyCode}`);
      if (newPrice && newPrice !== roomData.price.value) {
        console.log(`New Price: ${newPrice}`);
      }
      console.log(`Availability Status: ${status}`);
    }
  };

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} />
    </Carousel.Slide>
  ));

  return (
    <Card radius="md" withBorder padding="xl" className={classes.card}>
      <div className={`${classes.content} ${status === 'error' ? classes.blur : ''}`}>
        <Card.Section>
          <Carousel
            withIndicators
            loop
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
            }}
          >
            {slides}
          </Carousel>
          {checkAvailability && (
            <Badge className={classes.badge} color={getBadgeColor(status)}>
              {status}
            </Badge>
          )}
        </Card.Section>
        <Group mt="lg">
          <Text fw={500} fz="lg">
            {name}
          </Text>
        </Group>
        <Text fz="sm" c="dimmed" mt="sm">
          orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to make a type specimen book.
        </Text>
        <Group justify="space-between" mt="md">
          <div>
            <Text
              fz="xl"
              span
              fw={500}
              className={
                newPrice !== null && newPrice !== price.value ? classes.oldPrice : classes.price
              }
            >
              {price.value}
            </Text>
            <Text span fz="sm" c="dimmed" className={classes.currencyCode}>
              / {price.currencyCode}
            </Text>
            {newPrice !== null && newPrice !== price.value && (
              <>
                <Text fz="xl" span fw={500} className={classes.newPrice}>
                  {newPrice}
                </Text>
                <Text span fz="sm" c="dimmed">
                  / {price.currencyCode}
                </Text>
              </>
            )}
          </div>

          {!checkAvailability && (
            <Button radius="md" onClick={handleCheckAvailability}>
              Check
            </Button>
          )}
          {isLoading ? <Loader color="blue" /> : checkAvailability && (
            <Tooltip
              label="Room is not available"
              withArrow
              position="top"
              disabled={status === 'available'}
            >
              <Button radius="md" disabled={status !== 'available'} onClick={handleBookNow}>
                Book now
              </Button>
            </Tooltip>
          )}
        </Group>
      </div>

      {(status === 'error' || isError) && (
        <div className={classes.overlay}>
          <Text fz="lg" fw={700}>
            Something went wrong.
          </Text>
          <Text fz="lg" fw={700}>
            Please contact your administrator.
          </Text>
        </div>
      )}
    </Card>
  );
};
