import styled from "styled-components";

export const SafeArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: env(safe-area-inset-top, 0);
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
