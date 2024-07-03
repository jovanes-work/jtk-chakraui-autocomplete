 # Countries Autocomplete Component

The `Autocomplete` component is a reusable React component built with Chakra UI that provides an input field with an autocomplete feature. It allows users to filter and select from a list of countries. The component dynamically displays a dropdown list of countries based on user input and provides options to clear the input.

## Features

- **Autocomplete Functionality:** Dynamically filters and displays a list of countries as the user types.
- **Clear Input:** Allows users to clear the input with a single click.
- **Customizable Placeholder:** The input placeholder can be customized via props.
- **User Selection Handling:** Calls a callback function when a country is selected.

## Props

| Prop         | Type       | Default Value | Description                                               |
|--------------|------------|---------------|-----------------------------------------------------------|
| `onSelected` | `function` | `undefined`   | Callback function that is called when a country is selected. |
| `placeholder` | `string`   | `""`          | Placeholder text for the input field.                       |
| `rest`        | `object`   | `{}`          | Additional props that can be passed to the `Box` component.  |

## Installation

Install the library via NPM:
- npm install react react-dom @chakra-ui/react @emotion/react @emotion/styled framer-motion react-icons
- npm i jtk-chakraui-autocomplete

### Version Compatibility
- React version 17.x.x or higher
- Chakra UI version 2.8.2


## Demo
![Autocomplete Demo](https://github.com/jovanes-work/jtk-chakraui-autocomplete/assets/173586194/87dd63a7-8a1c-49bc-a09f-cc210d356f42)


## Usage
~~~
import React from 'react';
import Autocomplete from 'jtk-chakraui-autocomplete';

const handleCountrySelect = (country) => {
  console.log('Selected country:', country);
};

const App = () => (
  <div>
    <Autocomplete 
      onSelected={handleCountrySelect} 
      placeholder="Type a country..." 
      width="300px"
    />
  </div>
);

export default App;
~~~

## Full Code 
~~~
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
        <InputLeftAddon>Country</InputLeftAddon>
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
~~~

## More Info

#### Chakra UI 

https://v2.chakra-ui.com/docs/components

#### Github
https://github.com/jovanes-work/jtk-chakraui-autocomplete

