import React, { useState } from "react";
import {
  Box,
  Input,
  List,
  ListItem,
  Icon,
  Text,
  InputGroup,
  InputRightElement,
  InputLeftAddon
} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { countries } from "./config";

const Autocomplete = ({ onSelected, placeholder = "", ...rest }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
      setShowOptions(true);
    } else {
      setShowOptions(false);
      setFilteredCountries([]);
    }
  };

  const handleSelect = (value) => {
    setInputValue(value);
    setShowOptions(false);
    onSelected(value);
  };

  const handleClear = () => {
    setInputValue("");
    setShowOptions(false);
  };

  return (
    <Box position="relative" w="100%" {...rest}>
      <InputGroup>
        <InputLeftAddon>Pais</InputLeftAddon>
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {inputValue && (
          <InputRightElement>
            <Icon
              as={AiOutlineCloseCircle}
              cursor="pointer"
              onClick={handleClear}
            />
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
          maxHeight={'200px'}
          overflowY={'scroll'}
        >
          <List>
            {filteredCountries.map((item, index) => (
              <ListItem
                key={index}
                px={3}
                py={2}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                onClick={() => handleSelect(item)}
              >
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
