import React from 'react';
import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { AddIcon, StarIcon } from '@chakra-ui/icons';

export default function VersionControlCard({
  versions,
  isLoading,
  activated,
  creatingNew,
  handleVersionChange,
  isLatestVersion,
  latestVersionName,
  handleResetFields,
  handleAddNewVersion,
  handleSetLatestVersion,
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Version</span>
          {creatingNew ? (
            <Button
              colorScheme="blue"
              variant="outline"
              isLoading={isLoading}
              onClick={handleResetFields}
              flexBasis={'45%'}
            >
              Reset Fields
            </Button>
          ) : (
            <div onClick={handleAddNewVersion}>
              <button className="cssbuttons-io-button">
                Add
                <div className="icon">
                  <AddIcon w={4} h={4}></AddIcon>
                </div>
              </button>
            </div>
          )}
        </div>
      </Heading>
      {creatingNew ? (
        <Input id="version_name" placeholder="type your version name" />
      ) : (
        <Flex
          minWidth="max-content"
          justifyContent="space-between"
          alignItems="center"
          gap="2"
        >
          <Select onChange={handleVersionChange}>
            {versions.map((config) => (
              <option
                selected={config.version === latestVersionName}
                value={config.version}
              >
                {config.version}
              </option>
            ))}
          </Select>
          {isLatestVersion ? (
            <Tooltip label="Global latest version" aria-label="A tooltip">
              <StarIcon
                style={{ width: '46.34' }}
                boxSize={4}
                color="yellow.300"
              />
            </Tooltip>
          ) : (
            <Tooltip
              label="Set as global latest version"
              aria-label="A tooltip"
            >
              <Button
                colorScheme="yellow"
                variant="solid"
                onClick={handleSetLatestVersion}
                isLoading={isLoading}
              >
                <StarIcon color="white" />
              </Button>
            </Tooltip>
          )}
        </Flex>
      )}
    </Stack>
  );
}
