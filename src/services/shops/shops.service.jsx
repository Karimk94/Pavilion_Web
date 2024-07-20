import camelize from "camelize";

export const shopsRequest = (location) => {
  return new Promise((resolve, reject) => {
    resolve({mock});
  });
};

export const shopsTransform = ({ results = [] }) => {
  const mappedResults = results.map((shop) => {

    // shop.photos = shop.photos.map((p) => {
    //   return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    // });

    return {
      ...shop,
      address: shop.vicinity,
      isOpenNow: shop.opening_hours && shop.opening_hours.open_now,
      isClosedTemporarily: shop.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
