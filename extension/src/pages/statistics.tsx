import {
  Box,
  Button,
  chakra,
  Flex,
  flexbox,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import tools from '../utils/tools';
import { FaRetweet } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import { FaReplyd } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import request from '../utils/request';
import { DownloadIcon, RepeatIcon } from '@chakra-ui/icons';

interface StatsCardProps {
  title: string;
  stat: number;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Statistics() {
  const [like, setLike] = useState(0);
  const [share, setShare] = useState(0);
  const [retweet, setRetweet] = useState(0);
  const [reply, setReply] = useState(0);
  const [body, setBody] = useState(0);
  const [fblike, setFbLike] = useState(0);
  const [fbComment, setFbComment] = useState(0);
  const [fbShare, setFbShare] = useState(0);

  const [userInfo, setUserInfo] = useState({ email: 0, role: -1 });
  const [curPlatform, setCurPlatform] = useState(null);
  const [versionName, setVersionName] = useState(null);

  //读取用户的click数据
  useEffect(() => {
    console.log('click data update');
    tools.chromeStorageGet(['curPlatform'], [setCurPlatform]);
    tools.chromeStorageGet(
      ['like', 'share', 'retweet', 'reply', 'body'],
      [setLike, setShare, setRetweet, setReply, setBody]
    );
    tools.chromeStorageGet(
      ['fblike', 'fbreply', 'fbshare'],
      [setFbLike, setFbComment, setFbShare]
    );
    tools.chromeStorageGet(['userInfo'], [setUserInfo]);
    tools.chromeStorageGet(['latestVersion'], [setVersionName]); 
  }, []);

  //get user role
  //get version
  //get platform
  //get click data
  const handleCreate = async () => {
    try {
      const resUploadUserdata = await request.uploadClickData(
        body,
        userInfo.email,
        curPlatform,
        versionName
      );
      //console.log(userInfo.email);
      console.log('upload user data :>> ', resUploadUserdata);
    } catch (e) {
      alert('error :>> ' + e);
    }
  };

  if(userInfo.email !== 0 && curPlatform !== null && versionName !== null){
    setInterval(handleCreate,3000);
  }
  
  if (curPlatform === 'twitter') {
    return (
      <Box maxW="7xl" mx={'auto'} pt={2} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}
          mb={2}
        >
          Statistics you need.
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Like'}
            stat={like}
            icon={<FcLike size={'3em'} />}
          />
          <StatsCard
            title={'Share'}
            stat={share}
            icon={<FiShare size={'3em'} />}
          />
          <StatsCard
            title={'Retweet'}
            stat={retweet}
            icon={<FaRetweet size={'3em'} />}
          />
          <StatsCard
            title={'Reply'}
            stat={reply}
            icon={<FaReplyd size={'3em'} />}
          />
        </SimpleGrid>

        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              marginTop: '12px',
            }}
          >
            <a
              href="https://us-central1-web-extension-project.cloudfunctions.net/downloadCSVFile"
              download=""
            >
              <Button
                leftIcon={<DownloadIcon />}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Download
              </Button>
            </a>
          </div>

          <div
            style={{
              marginTop: '12px',
            }}
          >
            <Button
              leftIcon={<RepeatIcon />}
              onClick={handleCreate}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      </Box>
    );
  } else if (curPlatform === 'facebook') {
    return (
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}
          mb={2}
        >
          Statistics you need.
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Like'}
            stat={fblike}
            icon={<FcLike size={'3em'} />}
          />
          <StatsCard
            title={'Share'}
            stat={fbShare}
            icon={<FiShare size={'3em'} />}
          />
          <StatsCard
            title={'Reply'}
            stat={fbComment}
            icon={<FaReplyd size={'3em'} />}
          />
        </SimpleGrid>

        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              marginTop: '12px',
            }}
          >
            <a
              href="https://us-central1-web-extension-project.cloudfunctions.net/downloadCSVFile"
              download=""
            >
              <Button
                leftIcon={<DownloadIcon />}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Download
              </Button>
            </a>
          </div>

          <div
            style={{
              marginTop: '12px',
            }}
          >
            <Button
              leftIcon={<RepeatIcon />}
              onClick={handleCreate}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      </Box>
    );
  } else {
    return <h1>Please go to a sns website</h1>;
  }
}
