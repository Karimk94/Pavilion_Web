import styled from "styled-components";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ThemeContext } from "./../../../services/theme/theme.context";
import { useContext } from "react";

const FieldRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  width: 100%;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
`;

const ToggleButton = styled.button`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.ui.primary};
  color: ${(props) => props.theme.colors.text.inverse};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.ui.secondary};
  }
`;

const SettingsScreen = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <SafeArea>
      <Section>
        <SectionTitle>Settings</SectionTitle>
        <FieldRow>
          <ToggleButton onClick={toggleTheme}>Toggle Theme</ToggleButton>
        </FieldRow>
        <FieldRow></FieldRow>
      </Section>
    </SafeArea>
  );
};

export default SettingsScreen;
