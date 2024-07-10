import { List, ListItem } from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import { FadeInView } from "../../../components/animations/fade.animation";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { LocationContext } from "../../../services/location/location.context";
import { ShopsContext } from "../../../services/shops/shops.context";
import { Search } from "../components/search.component";
import { ShopInfoCard } from "../components/shop-info-card.component";
import { TailSpin } from "react-loader-spinner";

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ShopList = styled(List)`
  padding: ${(props) => props.theme.space[3]};
`;

export const ShopsScreen = ({ navigation }) => {
  const { error: locationError } = useContext(LocationContext);
  const { isLoading, shops, error } = useContext(ShopsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  const hasError = !!error || !!locationError;

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <TailSpin
            height="100"
            width="100"
            color={colors.brand.primary}
            ariaLabel="loading"
          />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )}
      {!hasError && (
        <ShopList>
          {shops.map((item) => (
            <ListItem
              key={item.name}
              button
              onClick={() => navigation.navigate("ShopDetail", { shop: item })}
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <ShopInfoCard shop={item} />
                </FadeInView>
              </Spacer>
            </ListItem>
          ))}
        </ShopList>
      )}
    </SafeArea>
  );
};
