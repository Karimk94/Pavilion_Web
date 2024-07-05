import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { LocationContext } from "../../../services/location/location.context";
import { ProductsContext } from "../../../services/products/products.context";
import ProductInfoCard from "../components/product-info-card.component";
import { Search } from "../components/search.component";

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

const ProductItem = styled.div`
  cursor: pointer;
  margin-bottom: 16px;
`;

const ProductListContainer = styled.div`
  padding: 16px;
  width: 90%;
  max-width: 70rem;
  list-style: none;
  margin: 2rem auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const ProductsScreen = () => {
  const { error: locationError } = useContext(LocationContext);
  const { isLoading, products, currency, error } = useContext(ProductsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  const hasError = !!error || !!locationError;

  const navigate = useNavigate();

  const handleNavigateToProductDetail = (productId, pageCurrency) => {
    navigate(`/products/${productId}`, { state: { pageCurrency } });
  };

  return (
    <SafeArea>
      <HeaderContainer>
        {!isLoading && !hasError && (
          <Search
            isFavouritesToggled={isToggled}
            onFavouritesToggle={() => setIsToggled(!isToggled)}
          />
        )}
      </HeaderContainer>
      {isLoading && (
        <LoadingContainer>
          <LoadingText>Loading...</LoadingText>
        </LoadingContainer>
      )}
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={(path, state) => navigate(path, { state })}
        />
      )}
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )}
      {!hasError && (
        <ProductListContainer>
          {products.map((item) => (
            <ProductItem
              key={item.id}
              onClick={() => handleNavigateToProductDetail(item.id, currency)}
            >
              <Spacer position="bottom" size="large">
                <ProductInfoCard product={item} currency={currency} />
              </Spacer>
            </ProductItem>
          ))}
        </ProductListContainer>
      )}
    </SafeArea>
  );
};
