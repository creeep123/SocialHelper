import React, { ReactNode, useEffect, useState } from 'react';
import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';

export default function Content({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
