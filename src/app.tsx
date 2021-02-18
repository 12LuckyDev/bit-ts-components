import CustomInput from "./components/custom-input";
import CustomButton from "./components/custom-button";

import styled from "styled-components";

const StyledButton = styled.button`
  background: red;
  color: blue;
`;

const App = () => {
  return (
    <div>
      Hello bit ts components
      <CustomInput
        value=""
        onChange={(v: string) => {
          console.log(v);
        }}
      />
      <CustomButton component={StyledButton} name="sss" text="xDDD" onClick={() => {}} />
    </div>
  );
};

export default App;
