import { Divider, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartContext } from "../../../services/cart/cart.context";
import { payRequest } from "../../../services/checkout/checkout.service";
import { ShopInfoCard } from "../../shops/components/shop-info-card.component";
import { CartIcon, CartIconContainer, ClearButton, PayButton, PaymentProcessing } from "../components/checkout.styles";
import { CreditCardInput } from "../components/credit-card.component";

// Styled components for web
const ScrollView = styled.div`
  overflow-y: auto;
  max-height: 70vh; /* Example height constraint for scrollable content */
  padding: 16px;
`;

const NameInput = styled(TextField)`
  margin: ${(props) => props.theme.space[3]};
  width: 100%;
`;

export const CheckoutScreen = ({ navigation }) => {
  const { cart, shop, clearCart, sum } = useContext(CartContext);
  const [name, setName] = useState("");
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = () => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      navigation.navigate("CheckoutError", {
        error: "Please fill in a valid credit card",
      });
      return;
    }
    payRequest(card.id, sum, name)
      .then((result) => {
        setIsLoading(false);
        clearCart();
        navigation.navigate("CheckoutSuccess");
      })
      .catch((err) => {
        setIsLoading(false);
        navigation.navigate("CheckoutError", {
          error: err,
        });
      });
  };

  if (!cart.length || !shop) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon>cart_off</CartIcon>
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <ShopInfoCard shop={shop} />
      {isLoading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Order</Text>
          </Spacer>
          <List>
            {cart.map(({ item, price }, i) => (
              <ListItem key={`item-${i}`}>
                <ListItemText primary={`${item} - ${price / 100}`} />
                <Divider />
              </ListItem>
            ))}
          </List>
          <Text>Total: {sum / 100}</Text>
        </Spacer>
        <Spacer position="top" size="large" />
        <Divider />
        <NameInput
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Spacer position="top" size="large">
          {name.length > 0 && (
            <CreditCardInput
              name={name}
              onSuccess={setCard}
              onError={() =>
                navigation.navigate("CheckoutError", {
                  error: "Something went wrong processing your credit card",
                })
              }
            />
          )}
        </Spacer>
        <Spacer position="top" size="xxl" />
        <PayButton
          disabled={isLoading}
          onClick={onPay}
        >
          Pay
        </PayButton>
        <Spacer position="top" size="large">
          <ClearButton
            disabled={isLoading}
            onClick={clearCart}
          >
            Clear Cart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
