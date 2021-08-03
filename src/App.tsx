import styled from "styled-components";
import WakeLock from "./WakeLock";
import Clock from "./Clock";

const Wrapper = styled.div`
  background: black;
  height: 100vh;
  font-family: digital-clock-font;
`;

const App = () => {
  return (
    <Wrapper>
      <WakeLock />
      <Clock />;
    </Wrapper>
  );
};

export default App;
