export const setGeolocation = (item) => {
  return {
    type: 'SET_GEOLOCATION',
    payload: item
  };
};

export const setBase64URL = (item) => {
  return {
    type: 'SET_BASE64_URL',
    payload: item
  };
};
