import { Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FilterTickets.module.scss';
import { actionSelect } from '../store/filters/action';

function FilterTickets() {
  const selectTickets = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const ticketsButtons = [
    {
      label: 'Самый дешевый',
      value: 'Самый дешевый',
    },
    {
      label: 'Самый быстрый',
      value: 'Самый быстрый',
    },
    {
      label: 'Оптимальный',
      value: 'Оптимальный',
    },
  ];

  return (
    <Radio.Group
      className={styles['filters']}
      options={ticketsButtons}
      onChange={({ target: { value } }) => dispatch(actionSelect(value))}
      value={selectTickets}
      optionType="button"
      buttonStyle="solid"
    />
  );
}

export { FilterTickets };
