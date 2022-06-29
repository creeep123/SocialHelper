import React from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';

interface LinkItemProps {
  name: string;
  to: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', to: '/', icon: FiHome },
  { name: 'Statistics', to: '/', icon: FiTrendingUp },
  // { name: 'Rules', to: '/', icon: FiCompass },
  // { name: 'Favourites', to: '/', icon: FiStar },
  { name: 'Settings', to: '/', icon: FiSettings },
];

const SideBarDrawer = (props) => {
  const { isOpen, onClose, setCurrentPage, userRoleLevel } = props;
  return (
    <div className="drawers">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        setCurrentPage={setCurrentPage}
        userRoleLevel={userRoleLevel}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
        preserveScrollBarGap={true}
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            setCurrentPage={setCurrentPage}
            userRoleLevel={userRoleLevel}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  address: string;
  children: ReactText;
}
const NavItem = ({ icon, address, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href={address}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
  setCurrentPage: (pageName: string) => void;
  userRoleLevel: number;
}

const SidebarContent = ({
  onClose,
  userRoleLevel,
  setCurrentPage,
  ...rest
}: SidebarProps) => {
  const userLinkItems = [];
  if (userRoleLevel === 0) {
    userLinkItems.push(LinkItems[0], LinkItems[1], LinkItems[2]);
  } else {
    userLinkItems.push(LinkItems[0], LinkItems[1]);
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Social Helper
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {userLinkItems.map((link) => (
        // <NavItem key={link.name} address={link.to} icon={link.icon}>
        <NavItem
          key={link.name}
          // address={link.to}
          onClick={() => {
            setCurrentPage(link.name);
            onClose();
          }}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SideBarDrawer;
