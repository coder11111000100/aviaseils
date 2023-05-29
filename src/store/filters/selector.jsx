const selectInexpensive = (tickets) => {
  return [...tickets].sort((a, b) => a.price - b.price);
};

const selectTheFastest = (tickets) => {
  return [...tickets].sort((prev, next) => {
    const prevTime = prev.segments[0].duration + prev.segments[1].duration;
    const nextTime = next.segments[0].duration + next.segments[1].duration;
    return prevTime - nextTime;
  });
};

const selectOptimal = (tickets) => {
  return [...tickets].sort((prev, next) => {
    const prevTime = prev.segments[0].duration + prev.segments[1].duration;
    const nextTime = next.segments[0].duration + next.segments[1].duration;
    const prevPrice = prev.price;
    const nextPrice = next.price;
    if (prevPrice < nextPrice || prevTime < nextTime) {
      return 0;
    }
    return 1;
  });
};

const superSelector = (state) => {
  const { filters, transfers, tickets } = state;
  const res = [];
  if (transfers.length) {
    tickets.forEach((ticket) => {
      const { segments } = ticket;
      const count = segments[0].stops.length + segments[1].stops.length;
      transfers.forEach((item) => {
        if (count === parseInt(item[0], 10)) {
          res.push(ticket);
        }
      });
    });
  }

  if (res.length) {
    switch (filters) {
      case 'Самый дешевый': {
        return selectInexpensive(res);
      }
      case 'Самый быстрый': {
        return selectTheFastest(res);
      }
      case 'Оптимальный': {
        return selectOptimal(res);
      }

      default:
        return state;
    }
  }
  return res;
};

export { superSelector };
