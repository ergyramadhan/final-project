import React, { useState } from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';

interface IProps {
  imageUrl: string;
  title: string;
  artist: string;
  select: boolean;
  toggleSelect: () => void;
}

const Track: React.FC<IProps> = ({ imageUrl, title, artist, select, toggleSelect }) => {
  const [isSelected, setIsSelected] = useState<boolean>(select);

  const handleToggleSelect: () => void = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <Stack
      direction={{ base: 'row', sm: 'column' }}
      overflow="hidden"
      borderRadius={10}
      border="1px solid"
      borderColor="gray.200"
      role="group"
      _hover={{
        boxShadow: '0px 7px 15px -7px rgba(0, 0, 0, 0.1)',
      }}
    >
      <AspectRatio
        w={{ base: '35%', sm: '100%' }}
        ratio={1}
        overflow="hidden"
        borderRadius={{ sm: 10 }}
      >
        <Image
          src={imageUrl}
          alt={title}
          transform="scale(1.1)"
          _groupHover={{ transform: 'scale(1)' }}
          transition="transform .3s ease-in-out"
          data-testid="track-img" />
      </AspectRatio>

      <VStack
        p={{ base: 2, sm: 3 }}
        w={{ base: '65%', sm: '100%' }}
        h={{ base: '100%', sm: 'auto' }}
        gap={{ base: 0, sm: 2 }}
        align="strech"
        justify="space-between"
        style={{
          margin: 0
        }}
      >
        <Box>
          <Heading
            as="h3"
            size="sm"
            isTruncated
            data-testid="track-title"
          >
            {title}
          </Heading>
          <Text
            fontSize="sm"
            isTruncated
            data-testid="track-artist"
          >
            {artist}
          </Text>
        </Box>

        <HStack justify="flex-end">
          <Button
            variant={isSelected ? 'solid' : 'outline'}
            onClick={handleToggleSelect}
            data-testid="track-btn-select"
          >
            {isSelected ? 'Deselect' : 'Select'}
          </Button>
        </HStack>
      </VStack>
    </Stack>
  );
}

export default Track;
