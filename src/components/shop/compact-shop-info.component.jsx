import styled from "styled-components";
import { Text } from "../typography/text.component";

const CompactImage = styled.img`
  border-radius: 10px;
  width: 120px;
  height: 100px;
  object-fit: cover;
`;

const Item = styled.div`
  padding: 10px;
  max-width: 120px;
  text-align: center;
`;

const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;

export const CompactShopInfo = ({ shop, isMap }) => {
  const Image = isAndroid && isMap ? "iframe" : CompactImage;

  return (
    <Item>
      {isAndroid && isMap ? (
        <iframe
          src={shop.photos[0]}
          style={{ borderRadius: "10px", width: "120px", height: "100px" }}
        />
      ) : (
        <CompactImage src={shop.photos[0]} alt={shop.name} />
      )}
      <Text center variant="caption" numberOfLines={3}>
        {shop.name}
      </Text>
    </Item>
  );
};
