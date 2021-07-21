import react, { useState } from "react";
import { FormLabel, FormControl, Button } from "react-bootstrap";

const SearchInput = ({ value, onChange }) => {
  function handleChange(event) {
    onChange(event.target.value);
  }
  return (
    <FormLabel className="search" value={value} onChange={handleChange}>
      <FormControl
        placeholder="busque o seu produto"
        aria-label="busque o seu produto"
        aria-describedby="basic-addon2"
      />
    
    </FormLabel>
  );
};

export default SearchInput;
