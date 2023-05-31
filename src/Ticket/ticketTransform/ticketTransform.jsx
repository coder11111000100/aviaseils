/* eslint-disable no-underscore-dangle */
function transformTime(el) {
  const notInteger = el / 60;
  // eslint-disable-next-line no-bitwise
  const integer = ~~notInteger;
  let remainder = notInteger - integer;
  if (remainder) {
    remainder = Math.floor(remainder * 60);
  }
  return `${integer}Ч ${remainder}М`;
}

function getTime(time) {
  const date = new Date(time);
  let timeMinutes = date.getMinutes().toString();
  let timeHours = date.getHours().toString();
  if (timeMinutes.length <= 1) {
    timeMinutes = `0${date.getMinutes().toString()}`;
  }
  if (timeHours.length <= 1) {
    timeHours = `0${date.getHours().toString()}`;
  }
  return `${timeHours}:${timeMinutes}`;
}

function travelTime(time, minutes) {
  const date = new Date(time);
  date.setMinutes(minutes);
  return getTime(date);
}

const transformData = (price, segments) => {
  const { duration: d1, origin: from1, destination: to1, stops: stops1, date: date1 } = segments[0];
  const { duration: d2, origin: from2, destination: to2, stops: stops2, date: date2 } = segments[1];
  const _price = price.toString().replace(/(.*)(\d{3})/, '$1 $2');
  const _duration1 = transformTime(d1);
  const _duration2 = transformTime(d2);
  const visit1 = `${from1} - ${to1}`;
  const visit2 = `${from2} - ${to2}`;

  const _data1 = getTime(date1);
  const _data2 = getTime(date2);

  const _data1To = travelTime(date1, d1);
  const _data2To = travelTime(date2, d2);

  return {
    _price,
    _duration1,
    _duration2,
    visit1,
    visit2,
    stops1,
    stops2,
    _data1,
    _data2,
    _data1To,
    _data2To,
  };
};

export { transformData };
