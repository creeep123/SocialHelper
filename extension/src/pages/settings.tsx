import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import tools from '../utils/tools';
import request from '../utils/request';

const Settings = ({ userInfo, setUserInfo }) => {
  const [isUserLogin, changeUserLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // validate the form value is empty or not
  const validateForm = () => {
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    if (email === '') {
      return false;
    } else if (role === '') {
      return false;
    }
    const formData = {
      email,
      role,
    };
    return formData;
  };

  const clearFormInput = () => {
    document.getElementById('email').value = '';
    document.getElementById('role').value = '';
  };

  const handleSummit = async () => {
    setLoading(true);
    const formData = validateForm();
    if (formData !== false) {
      // 设置角色信息
      const resUR = await request.setUserRole(formData);
      if (resUR.code === 200 || resUR.code === 201) {
        // 拿到信息之后全局保存
        let newRole = null;
        if (resUR.role) {
          const {
            data: { role },
          } = resUR;
          newRole = role;
        }
        const newUserInfo = { role: newRole, ...userInfo };
        setUserInfo(newUserInfo);
        tools.chromeStorageSet({
          userInfo: newUserInfo,
        });
        toast({
          title: `Success: ${resUR.message}`,
          status: 'success',
          isClosable: true,
        });
      } else {
        toast({
          title: `Error:${resUR.message}`,
          status: 'error',
          isClosable: true,
        });
      }
      setLoading(false);
      // alert(message);
    } else {
      // ('请填写完整信息');
      setLoading(false);
      toast({
        title: `Error: Please fill the form!`,
        status: 'error',
        isClosable: true,
      });
    }
    setLoading(false);
    clearFormInput();
  };

  return (
    <Flex justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Role Setting
        </Heading>
        {/* <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl> */}
        {/* <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl> */}
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl id="role" isRequired>
          <FormLabel>Role</FormLabel>
          <Input
            placeholder="normal / admin / root"
            _placeholder={{ color: 'gray.500' }}
            type="role"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          {/* <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
          >
            Cancel
          </Button> */}
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleSummit}
            isLoading={loading}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Settings;
