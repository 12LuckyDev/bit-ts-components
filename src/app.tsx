import React, { useState } from "react";
import CustomInput from "./components/custom-input";
import CustomButton from "./components/custom-button";
import CustomNumberInput from "./components/custom-number-input";

import styled from "styled-components";

const StyledButton = styled.button`
  background: red;
  color: blue;
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
        displayType="around"
      />
    </div>
  );
};

export default App;
