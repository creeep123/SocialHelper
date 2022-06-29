import React from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Switch,
  Tooltip,
} from '@chakra-ui/react';

export default function HideControlCard({
  activated,
  creatingNew,
  hideRules,
  onSwitchHideRules,
}) {
  return (
    <Stack
      spacing={4}
      w={'full'}
      maxW={'md'}
      bg={'white'}
      rounded={'xl'}
      boxShadow={'lg'}
      p={6}
      my={6}
      style={activated ? {} : { display: 'none' }}
    >
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
        Hide
      </Heading>
      {/* 规则 */}
      <FormControl>
        {hideRules.map((rule) => {
          return (
            <Flex justifyContent={'space-between'}>
              <FormLabel htmlFor={rule.id} flexBasis={'80%'}>
                {rule.name}
              </FormLabel>
              <Switch
                id={rule.id}
                flexBasis={'20%'}
                isChecked={rule.value}
                onChange={onSwitchHideRules}
                isDisabled={!creatingNew}
              />
            </Flex>
          );
        })}
      </FormControl>
    </Stack>
  );
}
