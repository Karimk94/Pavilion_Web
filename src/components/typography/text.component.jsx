import styled from "styled-components";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body || "Arial, sans-serif"};
  font-weight: ${theme.fontWeights.regular || 400};
  color: ${theme.colors.text.primary || "black"};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body || "16px"};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body || "16px"};
`;

const error = (theme) => `
    color: ${theme.colors.text.error || "red"};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption || "12px"};
    font-weight: ${theme.fontWeights.bold || 700};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading || "Arial, sans-serif"};
    font-size: ${theme.fontSizes.body || "16px"};
    font-weight: ${theme.fontWeights.medium || 500};
`;

const money = (theme) => `
    font-size: ${theme.fontSizes.caption || "12px"};
    font-weight: ${theme.fontWeights.bold || 700};
    color: ${theme.colors.text.success || "green"};
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
  money,
};

const StyledText = styled.span`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ $variant, theme }) => variants[$variant](theme)}
`;

export const Text = ({ variant = "body", children, ...props }) => {
  return (
    <StyledText $variant={variant} {...props}>
      {children}
    </StyledText>
  );
};
