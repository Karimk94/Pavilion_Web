import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import { CartContext } from "../../../services/cart/cart.context";
import { ProductsContext } from "../../../services/products/products.context";
import { pascalToCamel } from "../../../utils/array-transform";
import fetchHttp from "../../../utils/fetchHttp";
import ProductInfoCard from "../components/product-info-card.component";

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

const OrderButtonWrapper = styled.div`
  text-align: center;
`;

const ProductDetailScreen = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  const { currency } = useContext(ProductsContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const productsTransform = (results = {}) => {
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
        const { response, errors } = await fetchHttp(
          `Product/getproductbyid`,
          requestOptions
        );

        const resdata = productsTransform(response);
        setProduct(resdata);
      } catch (error) {
        console.error("Error fetching product:", error);
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
          <TailSpin
            height="100"
            width="100"
            color={colors.brand.primary}
            ariaLabel="loading"
          />
        </LoadingContainer>
      ) : (
        <>
          {product && (
            <ProductInfoCard product={product} currency={currency} isDetail />
          )}
          <ScrollView>{/* Accordion content goes here */}</ScrollView>
        </>
      )}
    </SafeArea>
  );
};

export default ProductDetailScreen;
