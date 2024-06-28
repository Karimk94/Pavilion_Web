import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import { CartContext } from "../../../services/cart/cart.context";
import { pascalToCamel } from "../../../utils/array-transform";
import { host } from "../../../utils/env";
import fetchHttp from "../../../utils/fetchHttp";
import ProductInfoCard from "../components/product-info-card.component";
import { OrderButton } from "../components/product-list.styles";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingText = styled.div`
  font-size: 24px;
  color: ${colors.brand.primary};
`;

const ScrollView = styled.div`
  overflow-y: auto;
  max-height: 70vh; /* Example height constraint for scrollable content */
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
`;

const AccordionTitle = styled.div`
  flex: 1;
`;

const AccordionIcon = styled.div`
  flex: 0 0 auto;
`;

const AccordionContent = styled.div`
  padding: 10px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const DividerLine = styled.hr`
  margin: 10px 0;
`;

const OrderButtonWrapper = styled.div`
  text-align: center;
`;

const ProductDetailScreen = () => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const productsTransform = (results = []) => {
    return pascalToCamel(results);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({ Id: parseInt(productId) });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetchHttp(`${host}Product/getproductbyid`, requestOptions);
        const data = productsTransform(response.data);
        setProduct(data);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <SafeArea>
      {loading ? (
        <LoadingContainer>
          <LoadingText>Loading...</LoadingText>
        </LoadingContainer>
      ) : (
        <>
          {product && <ProductInfoCard product={product} isDetail />}
          <ScrollView>
            {/* Breakfast Accordion */}
            <AccordionHeader onClick={() => setBreakfastExpanded(!breakfastExpanded)}>
              <AccordionTitle>Breakfast</AccordionTitle>
              <AccordionIcon>{breakfastExpanded ? "-" : "+"}</AccordionIcon>
            </AccordionHeader>
            {breakfastExpanded && (
              <AccordionContent>
                <div>Eggs Benedict</div>
                <DividerLine />
                <div>Classic Breakfast</div>
              </AccordionContent>
            )}
            <DividerLine />

            {/* Lunch Accordion */}
            <AccordionHeader onClick={() => setLunchExpanded(!lunchExpanded)}>
              <AccordionTitle>Lunch</AccordionTitle>
              <AccordionIcon>{lunchExpanded ? "-" : "+"}</AccordionIcon>
            </AccordionHeader>
            {lunchExpanded && (
              <AccordionContent>
                <div>Burger w/ Fries</div>
                <DividerLine />
                <div>Steak Sandwich</div>
                <DividerLine />
                <div>Mushroom Soup</div>
              </AccordionContent>
            )}
            <DividerLine />

            {/* Dinner Accordion */}
            <AccordionHeader onClick={() => setDinnerExpanded(!dinnerExpanded)}>
              <AccordionTitle>Dinner</AccordionTitle>
              <AccordionIcon>{dinnerExpanded ? "-" : "+"}</AccordionIcon>
            </AccordionHeader>
            {dinnerExpanded && (
              <AccordionContent>
                <div>Spaghetti Bolognese</div>
                <DividerLine />
                <div>Veal Cutlet with Chicken Mushroom Rotini</div>
                <DividerLine />
                <div>Steak Frites</div>
              </AccordionContent>
            )}
            <DividerLine />

            {/* Drinks Accordion */}
            <AccordionHeader onClick={() => setDrinksExpanded(!drinksExpanded)}>
              <AccordionTitle>Drinks</AccordionTitle>
              <AccordionIcon>{drinksExpanded ? "-" : "+"}</AccordionIcon>
            </AccordionHeader>
            {drinksExpanded && (
              <AccordionContent>
                <div>Coffee</div>
                <DividerLine />
                <div>Tea</div>
                <DividerLine />
                <div>Modelo</div>
                <DividerLine />
                <div>Coke</div>
                <DividerLine />
                <div>Fanta</div>
              </AccordionContent>
            )}
            <DividerLine />
          </ScrollView>

          {/* Order Button */}
          <Spacer position="bottom" size="large">
            <OrderButtonWrapper>
              <OrderButton
                onClick={() => {
                  addToCart({ item: "special", price: 1299 }, product);
                  navigate("/checkout");
                }}
              >
                Order Special Only 12.99!
              </OrderButton>
            </OrderButtonWrapper>
          </Spacer>
        </>
      )}
    </SafeArea>
  );
};

export default ProductDetailScreen;
