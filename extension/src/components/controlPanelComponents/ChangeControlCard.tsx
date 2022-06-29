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
  Text,
  Divider,
  Spacer,
  Tag,
  TagLabel,
  Textarea,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { placeholders } from '../ruleMaps';

export default function ChangeControlCard({
  addFields,
  creatingNew,
  curPlatform,
  changeRules,
  removeFields,
  handleFormChange,
}) {
  const submit = (e) => {
    e.preventDefault();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      style={creatingNew || changeRules.length > 0 ? {} : { display: 'none' }}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>
            How to use <b>change</b>?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div
              style={{
                overflow: 'auto',
                maxHeight: '400px',
                maxWidth: '370px',
                padding: '16px',
              }}
            >
              <Text fontSize="xs">
                Paste or type in the "original url"* input area for each link
                you want to apply the "Change" function to.
              </Text>
              <br />
              <Heading as="h5" size="sm">
                *origin url
              </Heading>
              <Text fontSize="xs">
                There are two ways to locate the element you want to change,
                "url" or "fix position", the format is like "http://xxx.xxx" or
                "fix-position-1"
              </Text>
              <br />
              <Heading as="h5" size="sm">
                Username/Content
              </Heading>
              <Text fontSize="xs">Just input the new content</Text>
              <br />
              <Heading as="h5" size="sm">
                Image
              </Heading>
              <Text fontSize="xs">
                Send twitter with the images you want to use as replacement, and
                copy their urls.Input the ones, separated by commas
              </Text>
              <br />
              {/* <Heading as="h5" size="sm">
              Video
            </Heading>
            <Text fontSize="xs">Input the new urls of video</Text>
            <br /> */}
              <Heading as="h5" size="sm">
                Card
              </Heading>
              <Text fontSize="xs">
                The card content consisted of four part:[target
                url],[title],[abstract],[content] and [summaried information],
                please input them respectively
              </Text>
              <br />
              <Heading as="h5" size="sm">
                Comment Summary
              </Heading>
              <Text fontSize="xs">
                Input the number of people who think it's true, and the number
                of people who think it's fake
              </Text>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
        Change&nbsp;
        {/* <Tooltip
          closeOnClick={true}
          closeOnMouseDown={false}
          label={

          }
          openDelay={500}
          fontSize="md"
        > */}
        <Button onClick={onOpen} variant="ghost">
          <QuestionOutlineIcon w={3} h={3} color={'gray.400'} />
        </Button>
        {/* </Tooltip> */}
      </Heading>
      <form onSubmit={submit}>
        {changeRules.map((form, index) => {
          return (
            <div key={index}>
              <Divider mt={6} mb={2} />
              <Flex direction={'column'} gap="2">
                <Flex gap="2">
                  <Tag>
                    <TagLabel>Rule {index + 1}</TagLabel>
                  </Tag>
                  <Spacer />
                  <Button
                    colorScheme="red"
                    size="xs"
                    onClick={() => removeFields(index)}
                    style={creatingNew ? {} : { display: 'none' }}
                  >
                    <MinusIcon />
                  </Button>
                </Flex>
                <Select
                  name="type"
                  placeholder="Select a type"
                  disabled={!creatingNew}
                  value={form.type}
                  onChange={(event) => handleFormChange(event, index)}
                >
                  <option value={'user_name'}>User name</option>
                  <option value={'content'}>Content</option>
                  <option value={'image'}>Image</option>
                  <option value={'card'}>Card</option>
                  {/* {curPlatform === 'twitter' ? (
                  <option value={'video'}>Video</option>
                ) : null} */}
                  <option value={'com_sum'}>Comment Summary</option>
                  {curPlatform === 'facebook' ? (
                    <option value={'inserted_card'}>Inserted Card</option>
                  ) : null}
                </Select>
                <Input
                  disabled={!creatingNew}
                  name="origin"
                  placeholder="original url"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.origin}
                />
                {form.type === 'image' ? (
                  <Textarea
                    disabled={!creatingNew}
                    name="replacement"
                    placeholder={
                      form.type === ''
                        ? 'Change it to...'
                        : placeholders[form.type]
                    }
                    onChange={(event) => handleFormChange(event, index)}
                    value={
                      !creatingNew &&
                      Array.isArray(form.replacement) &&
                      form.replacement.length >= 1
                        ? form.replacement.join(',')
                        : form.replacement
                    }
                  />
                ) : form.type === 'card' ? (
                  <>
                    <Input
                      disabled={!creatingNew}
                      name="replacement-url"
                      placeholder={placeholders[form.type][0]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[0]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-title"
                      placeholder={placeholders[form.type][1]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[1]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-abstract"
                      placeholder={placeholders[form.type][2]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[2]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-content"
                      placeholder={placeholders[form.type][3]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[3]}
                    />
                    {curPlatform === 'twitter' ? (
                      <Input
                        disabled={!creatingNew}
                        name="info-summary"
                        placeholder={placeholders[form.type][4]}
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.replacement[4]}
                      />
                    ) : null}
                  </>
                ) : form.type === 'inserted_card' ? (
                  <>
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-avatarFlag"
                      placeholder={placeholders[form.type][0]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[0]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-avatarImgUrl"
                      placeholder={placeholders[form.type][1]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[1]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-userName"
                      placeholder={placeholders[form.type][2]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[2]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-userNameUrl"
                      placeholder={placeholders[form.type][3]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[3]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-timeFlag"
                      placeholder={placeholders[form.type][4]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[4]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-time"
                      placeholder={placeholders[form.type][5]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[5]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-content"
                      placeholder={placeholders[form.type][6]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[6]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-resourceUrl"
                      placeholder={placeholders[form.type][7]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[7]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-resourceImg"
                      placeholder={placeholders[form.type][8]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[8]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-infoSum"
                      placeholder={placeholders[form.type][9]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[9]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-resourcesWebsite"
                      placeholder={placeholders[form.type][10]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[10]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-abstract"
                      placeholder={placeholders[form.type][11]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[11]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-like_number"
                      placeholder={placeholders[form.type][12]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[12]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-comment"
                      placeholder={placeholders[form.type][13]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[13]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-inserted-share"
                      placeholder={placeholders[form.type][14]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[14]}
                    />
                  </>
                ) : form.type === 'com_sum' ? (
                  <>
                    <Input
                      disabled={!creatingNew}
                      name="replacement-true"
                      placeholder={placeholders[form.type][0]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[0]}
                    />
                    <Input
                      disabled={!creatingNew}
                      name="replacement-fake"
                      placeholder={placeholders[form.type][1]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[1]}
                    />
                    {/* <Input
                      disabled={!creatingNew}
                      name="replacement-dontcare"
                      placeholder={placeholders[form.type][2]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[2]}
                    /> */}
                    <Input
                      disabled={!creatingNew}
                      name="replacement-summary-type"
                      placeholder={placeholders[form.type][2]}
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.replacement[2]}
                    />
                  </>
                ) : (
                  <Input
                    disabled={!creatingNew}
                    name="replacement"
                    placeholder={
                      form.type === ''
                        ? 'Change it to...'
                        : placeholders[form.type]
                    }
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.replacement}
                  />
                )}
              </Flex>
            </div>
          );
        })}
      </form>
      <Button
        colorScheme="gray"
        onClick={addFields}
        style={creatingNew ? {} : { display: 'none' }}
      >
        <AddIcon />
      </Button>
      <br />
    </Stack>
  );
}
