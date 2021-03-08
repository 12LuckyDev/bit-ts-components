import React, { useState } from "react";
import CustomInput from "./components/custom-input";
import CustomButton from "./components/custom-button";
import CustomNumberInput from "./components/custom-number-input";

import styled from "styled-components";

const StyledButton = styled.button`
  background: red;
  color: blue;
`;

const StyledNumberButton = styled.button`
  appearance: none;
  width: 20rem;
  max-width: 100%;
  padding: 0.75rem 2rem;
  outline: none;
  border: 3px solid;
  border-radius: 1.5rem;
  background-color: transparent;
  font-weight: bold;
  color: #ffffff;
  border-color: #ffffff;

  transition: background-color 0.4s ease;

  &:hover {
    background-color: #ffffff;
    color: #000000;
  }

  &:active {
    background-color: #747474;
  }
`;

const App = () => {
  const [number, setNumber] = useState<number | null>(0);
  return (
    <div>
      Hello bit ts components
      <CustomInput
        value=""
        onChange={(v: string) => {
          console.log(v);
        }}
      />
      <CustomButton
        component={StyledButton}
        name="sss"
        text="xDDD"
        onClick={() => {}}
      />
      <CustomNumberInput
        name="number"
        onChange={(value) => {
          setNumber(value);
        }}
        value={number}
        labelText="NUMBER TEST"
        displayType="end"
      />
      <CustomNumberInput
        name="number"
        onChange={(value) => {
          setNumber(value);
        }}
        value={number}
        labelText="NUMBER TEST"
        displayType="end"
        buttonsWrapperClassName="button-wrapper-test-class"
        inputWrapperClassName="wrapper-test-class"
      />
      <CustomNumberInput
        name="number"
        onChange={(value) => {
          setNumber(value);
        }}
        value={number}
        labelText="NUMBER TEST"
        displayType="around"
        buttonsComponent={StyledNumberButton}
      />
    </div>
  );
};

export default App;
