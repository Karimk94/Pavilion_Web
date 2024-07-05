import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, List } from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartContext } from "../../../services/cart/cart.context";
import { ShopInfoCard } from "../components/shop-info-card.component";

const OrderButton = styled(Button)`
  width: 100%;
  padding: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.brand.primary};
  color: ${(props) => props.theme.colors.text.inverse};
  &:hover {
    background-color: ${(props) => props.theme.colors.brand.primaryHover};
  }
`;

export const ShopDetailScreen = ({ navigation, route }) => {
  const [expanded, setExpanded] = useState(false);

  const { shop } = route.params;
  const { addToCart } = useContext(CartContext);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <SafeArea>
      <ShopInfoCard shop={shop} />
      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <List.ItemIcon>
              <span role="img" aria-label="bread-slice">🍞</span>
            </List.ItemIcon>
            Breakfast
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <List.Item>Eggs Benedict</List.Item>
              <Divider />
              <List.Item>Classic Breakfast</List.Item>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
            <List.ItemIcon>
              <span role="img" aria-label="hamburger">🍔</span>
            </List.ItemIcon>
            Lunch
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <List.Item>Burger w/ Fries</List.Item>
              <Divider />
              <List.Item>Steak Sandwich</List.Item>
              <Divider />
              <List.Item>Mushroom Soup</List.Item>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
            <List.ItemIcon>
              <span role="img" aria-label="food-variant">🍲</span>
            </List.ItemIcon>
            Dinner
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <List.Item>Spaghetti Bolognese</List.Item>
              <Divider />
              <List.Item>Veal Cutlet with Chicken Mushroom Rotini</List.Item>
              <Divider />
              <List.Item>Steak Frites</List.Item>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
            <List.ItemIcon>
              <span role="img" aria-label="cup">☕</span>
            </List.ItemIcon>
            Drinks
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <List.Item>Coffee</List.Item>
              <Divider />
              <List.Item>Tea</List.Item>
              <Divider />
              <List.Item>Modelo</List.Item>
              <Divider />
              <List.Item>Coke</List.Item>
              <Divider />
              <List.Item>Fanta</List.Item>
            </List>
          </AccordionDetails>
        </Accordion>
      </div>
      <Spacer position="bottom" size="large">
        <OrderButton
          onClick={() => {
            addToCart({ item: "special", price: 1299 }, shop);
            navigation.navigate("Checkout");
          }}
        >
          Order Special Only 12.99!
        </OrderButton>
      </Spacer>
    </SafeArea>
  );
};
