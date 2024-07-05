import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import styled from "styled-components";
import { cardTokenRequest } from "../../../services/checkout/checkout.service";

const CardInputContainer = styled.div`
  .rpi-input {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 10px;
  }

  .rpi-card-number,
  .rpi-expiration-date,
  .rpi-cvc {
    width: 100%;
  }
`;

export const CreditCardInput = ({ name, onSuccess, onError }) => {
  const [card, setCard] = useState({
    number: "",
    name: name,
    expiry: "",
    cvc: "",
  });
  const [focused, setFocused] = useState("");

  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    wrapperProps,
  } = usePaymentInputs();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  const handleCardSubmit = async () => {
    const expiry = card.expiry.split("/");
    const cardDetails = {
      number: card.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: card.cvc,
      name: card.name,
    };
    try {
      const info = await cardTokenRequest(cardDetails);
      onSuccess(info);
    } catch (e) {
      onError();
    }
  };

  const isIncomplete = !card.number || !card.name || !card.expiry || !card.cvc;

  return (
    <Box>
      <CardInputContainer {...wrapperProps}>
        <div>
          <svg {...getCardImageProps({ images })} />
          <input
            {...getCardNumberProps({
              onChange: handleInputChange,
              onFocus: handleInputFocus,
            })}
          />
        </div>
        <input
          {...getExpiryDateProps({
            onChange: handleInputChange,
            onFocus: handleInputFocus,
          })}
        />
        <input
          {...getCVCProps({
            onChange: handleInputChange,
            onFocus: handleInputFocus,
          })}
        />
      </CardInputContainer>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            type="text"
            name="name"
            value={card.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleCardSubmit}
            disabled={isIncomplete}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
