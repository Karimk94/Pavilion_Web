import { useCallback, useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import styled from "styled-components";
import { CartContext } from "../../../services/cart/cart.context";
import { convertCurrency } from "../../../utils/currency-converter";

Modal.setAppElement("#root");

const CartModalContainer = styled(Modal)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 10px;
  padding: 20px;
  max-width: 600px;
  margin: 50px auto;
  outline: none;
  color: ${(props) => props.theme.colors.ui.primary};
  font-family: "Roboto", sans-serif;
  position: relative;
`;

const CloseButton = styled.button`
  background: transparent;
  color: ${(props) => props.theme.colors.ui.primary};
  border: none;
  cursor: pointer;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: ${(props) => props.theme.colors.ui.secondary};
  }
`;

const CheckoutButton = styled.button`
  background-color: ${(props) => props.theme.colors.ui.primary};
  color: ${(props) => props.theme.colors.bg.primary};
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  margin-top: 20px;

  &:hover {
    background: ${(props) => props.theme.colors.ui.secondary};
  }
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const ItemName = styled.span`
  flex: 2;
`;

const ItemPrice = styled.span`
  flex: 1;
`;

const ItemQuantity = styled.span`
  flex: 1;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.ui.primary};

  &:hover {
    color: ${(props) => props.theme.colors.ui.secondary};
  }
`;

const StyledQuantityButton = styled.button`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-color: ${(props) => props.theme.colors.ui.primary};
  cursor: pointer;
  color: ${(props) => props.theme.colors.ui.primary};
  border-radius: 5px;

  &:hover {
    color: ${(props) => props.theme.colors.ui.secondary};
  }
`;

const WarningModalContainer = styled(Modal)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  color: ${(props) => props.theme.colors.ui.primary};
  border-radius: 10px;
  padding: 20px;
  max-width: 400px;
  margin: 50px auto;
  outline: none;
  font-family: "Roboto", sans-serif;
  position: relative;
  text-align: center;
`;

const WarningButton = styled.button`
  background: ${(props) => props.theme.colors.ui.primary};
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  margin: 10px;

  &:hover {
    background: ${(props) => props.theme.colors.ui.secondary};
  }
`;

const CartModal = ({ isOpen = false, onClose, currency }) => {
  const { cart, addToCart, removeFromCart, deleteFromCart } =
    useContext(CartContext);
  const [warningItem, setWarningItem] = useState(null);
  const [convertedCart, setConvertedCart] = useState([]);

  const convertPrices = useCallback(async () => {
    const updatedCart = await Promise.all(
      cart.map(async (item) => {
        const convertedPrice = await convertCurrency(
          item.price,
          "USD",
          currency.currencyCode
        );
        return { ...item, convertedPrice };
      })
    );
    setConvertedCart(updatedCart);
  }, [cart, currency.currencyCode]);

  useEffect(() => {
    convertPrices();
  }, [convertPrices]);

  const getTotalPrice = () => {
    return convertedCart
      .reduce((total, item) => total + item.convertedPrice * item.quantity, 0)
      .toFixed(2);
  };

  const handleRemove = (item) => {
    if (item.quantity === 1) {
      setWarningItem(item);
    } else {
      removeFromCart(item);
    }
  };

  const handleDelete = (item) => {
    setWarningItem(item);
  };

  const confirmDelete = () => {
    if (warningItem) {
      deleteFromCart(warningItem);
      setWarningItem(null);
    }
  };

  const cancelDelete = () => {
    setWarningItem(null);
  };

  return (
    <>
      <CartModalContainer
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Cart Modal"
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Cart</h2>
        {convertedCart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ItemList>
            {convertedCart.map((item) => (
              <Item key={item.id}>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{`${(item.convertedPrice * item.quantity).toFixed(
                  2
                )} ${currency.currencySymbol}`}</ItemPrice>
                <ButtonContainer>
                  <StyledQuantityButton onClick={() => handleRemove(item)}>
                    -
                  </StyledQuantityButton>
                  <ItemQuantity>{item.quantity}</ItemQuantity>
                  <StyledQuantityButton onClick={() => addToCart(item)}>
                    +
                  </StyledQuantityButton>
                  <DeleteButton onClick={() => handleDelete(item)}>
                    <FaTrash />
                  </DeleteButton>
                </ButtonContainer>
              </Item>
            ))}
          </ItemList>
        )}
        <p>Total Price: {`${getTotalPrice()} ${currency.currencySymbol}`}</p>
        <CheckoutButton onClick={() => alert("Proceed to checkout")}>
          Checkout
        </CheckoutButton>
      </CartModalContainer>
      <WarningModalContainer
        isOpen={!!warningItem}
        onRequestClose={cancelDelete}
        contentLabel="Warning Modal"
      >
        <h2>Are you sure?</h2>
        <p>Do you want to remove {warningItem?.name} from the cart?</p>
        <WarningButton onClick={confirmDelete}>Yes</WarningButton>
        <WarningButton onClick={cancelDelete}>No</WarningButton>
      </WarningModalContainer>
    </>
  );
};

export default CartModal;
