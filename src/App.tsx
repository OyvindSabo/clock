import styled from "styled-components";
import Clock from "./Clock";

const Wrapper = styled.div`
  background: black;
  height: 100vh;
`;

const App = () => {
  return (
    <Wrapper>
      <Clock />;
    </Wrapper>
  );
};

export default App;
