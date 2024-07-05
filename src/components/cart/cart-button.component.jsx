import { useContext } from "react";
import { CartContext } from "../../services/cart/cart.context";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  position: relative;

  &:hover {
    color: ${(props) => props.theme.colors.brand.primary};
  }
`;

const CartCount = styled.span`
  background-color: ${(props) => props.theme.colors.brand.primary};
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
`;

const CartButton = ({ onClick }) => {
  const { cart } = useContext(CartContext);

  return (
    <Button onClick={onClick}>
      <FaShoppingCart />
      {cart.length > 0 && <CartCount>{cart.length}</CartCount>}
    </Button>
  );
};

export default CartButton