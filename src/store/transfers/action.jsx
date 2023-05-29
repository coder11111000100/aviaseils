const actionTransfers = (transfers) => {
  const t = transfers.map((item) => {
    if (item === 'Без пересадок') {
      return '0 пересадок';
    }
    return item;
  });

  return {
    type: 'TRANSFERS',
    transfers: t,
  };
};

export { actionTransfers };
