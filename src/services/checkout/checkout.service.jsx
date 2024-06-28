import createStripe from "stripe-client";
import { host } from "../../utils/env";

const stripe = createStripe(
  "sk_test_51PD5mYLCIPnwqr7pf0XvfCMTFFkl7p9LgJCKGr5TJpPBTQH2f346fnl7qm8Xay7DyKp6YxhTyd418fN6dnTsC1JF00A94smGcm"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong processing your payment");
    }
    return res.json();
  });
};
