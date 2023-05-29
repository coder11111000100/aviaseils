const selectPrice = (price) => {
  return price.toString().replace(/\$\d{3}/, '$` $&');
};

export { selectPrice };
