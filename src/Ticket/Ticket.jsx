import PropTypes from 'prop-types';
import styles from './Ticket.module.scss';
import img from '../assets/S7 Logo.png';
import { transformData } from './ticketTransform/ticketTransform';

function Ticket({ data }) {
  const { price, segments } = data;
  const objText = transformData(price, segments);
  const { _price, _duration1, _duration2, visit1, visit2, stops1, stops2, _data1, _data2, _data1To, _data2To } =
    objText;
  return (
    <div className={styles['ticket']}>
      <div className={styles['ticket__header']}>
        <div className={styles['ticket__price']}>{_price} Р </div>
        <img className={styles['ticket__logo']} alt="logo" src={img} />
      </div>

      <ul className={`${styles['ticket__item']} styles['from']`}>
        <li>
          <ul>
            <li>{visit1}</li>
            <li>
              {_data1} – {_data1To}
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>В пути</li>
            <li>{_duration1}</li>
          </ul>
        </li>
        <li>
          <ul>
            <li>{stops1.length} пересадки</li>
            <li>{stops1.join(', ')}</li>
          </ul>
        </li>
      </ul>

      <ul className={`${styles['ticket__item']} styles['to']`}>
        <li>
          <ul>
            <li>{visit2}</li>
            <li>
              {_data2} – {_data2To}
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>В пути</li>
            <li>{_duration2}</li>
          </ul>
        </li>
        <li>
          <ul>
            <li>{stops2.length} пересадка</li>
            <li>{stops2.join(', ')}</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

Ticket.defaultProps = {
  data: {},
};

Ticket.propTypes = {
  data: PropTypes.object,
};

export { Ticket };
