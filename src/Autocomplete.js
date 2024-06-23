import React, { useState } from 'react';
import {
  Box,
  Input,
  List,
  ListItem,
  ListIcon,
  Icon,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { countries } from './config';

const Autocomplete = ({ onSelected, placeholder = 'Buscar...', ...rest }) => {
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setShowOptions(value.length > 0);
  };

  const handleSelect = (value) => {
    setInputValue(value);
    setShowOptions(false);
    onSelected(value);
  };

  const handleClear = () => {
    setInputValue('');
    setShowOptions(false);
  };

  return (
    <Box position="relative" {...rest}>
      <InputGroup>
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {inputValue && (
          <InputRightElement>
            <Icon as={AiOutlineCloseCircle} cursor="pointer" onClick={handleClear} />
          </InputRightElement>
        )}
      </InputGroup>

      {showOptions && (
        <Box
          position="absolute"
          width="100%"
          mt={1}
          border="1px"
          borderColor="gray.200"
          shadow="md"
          bg="white"
          zIndex="1"
        >
          <List>
            {countries.map((item,index) => (
              <ListItem
                key={index}
                px={3}
                py={2}
                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                onClick={() => handleSelect(item)}
              >
                <ListIcon as={AiOutlineCloseCircle} color="blue.500" />
                <Text>{item}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Autocomplete;