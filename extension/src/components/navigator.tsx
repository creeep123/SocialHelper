import React, { ReactNode, useEffect, useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import LoginModal from './loginModal';
import SideBarDrawer from './sideBarDrawer.tsx';
import server from '../server/server';
import twitter from '../assets/images/twitter.png';
// import testAvatar from '../assets/images/test.png';
import request from '../utils/request';
import tools from '../utils/tools';
import { AtSignIcon } from '@chakra-ui/icons';

export default function Navigator(props) {
  const {
    userInfo,
    setUserInfo,
    children,
    setCurrentPage,
    userRoleLevel,
    setLevel,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      minH={userRoleLevel >= 2 ? '0vh' : '100vh'}
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <SideBarDrawer
        isOpen={isOpen}
        onClose={onClose}
        setCurrentPage={setCurrentPage}
        userRoleLevel={userRoleLevel}
      ></SideBarDrawer>
      {/* mobilenav */}
      <MobileNav
        onOpen={onOpen}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        userRoleLevel={userRoleLevel}
        setLevel={setLevel}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface MobileProps extends FlexProps {
  userInfo: any;
  setUserInfo: (info: any) => void;
  onOpen: () => void;
  setLevel: (level: number) => void;
  userRoleLevel: number;
}
const MobileNav = ({
  onOpen,
  setUserInfo,
  userRoleLevel,
  setLevel,
  userInfo,
  ...rest
}: MobileProps) => {
  const { photoUrl } = userInfo;
  const isUserLogin = userRoleLevel >= 3 ? false : true;
  const handleLogin = async () => {
    try {
      // 获取谷歌账户信息
      const resGoogle = await server.startSignIn();
      const {
        reloadUserInfo: { providerUserInfo },
      } = resGoogle;
      console.log('resGoogle :>> ', resGoogle);
      // 获取角色信息
      const resRole = await request.getUserRole(providerUserInfo[0].email);
      // 拿到信息之后全局保存
      const newUserInfo = { role: resRole, ...providerUserInfo[0] };
      setUserInfo(newUserInfo);
      setLevel(tools.getUserRoleLevel(resRole));
      tools.chromeStorageSet({
        userInfo: newUserInfo,
        // config: resConfig,
        // configAll: resConfigAll,
      });
    } catch (e) {
      alert('error while init:' + e);
    }
  };

  const ckrole = async () => {
    handleLogin();
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      {userRoleLevel >= 2 ? null : (
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
      )}
      <Text
        style={{ marginLeft: '46px' }}
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {/* <img src={twitter}></img> */}
        <AtSignIcon w={6} h={6} color="blue.500" />
        {/* <button onClick={ckrole}>testsetest</button> */}
      </Text>

      <HStack w="70px" spacing={{ base: '0', md: '6' }} justify={'end'}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={'center'}>
          {/* <Avatar
            size={'sm'}
            src={
              'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            }
          /> */}
          {isUserLogin ? (
            <Avatar size={'sm'} src={photoUrl} />
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
          {/* <LoginModal></LoginModal> */}
          {/* <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu> */}
        </Flex>
      </HStack>
    </Flex>
  );
};
