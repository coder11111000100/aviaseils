import { Checkbox, ConfigProvider } from 'antd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './TransferTickets.module.scss';
import { actionTransfers } from '../store/transfers/action';

function TransferTickets() {
  const plainOptions = ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
  const [checkedList, setCheckedList] = useState(plainOptions);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(true);
  const dispatch = useDispatch();
  const CheckboxGroup = Checkbox.Group;

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    dispatch(actionTransfers(list));
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    if (e.target.checked) {
      dispatch(actionTransfers(plainOptions));
    } else {
      dispatch(actionTransfers([]));
    }
  };

  return (
    <div className={styles['transfer']}>
      <span className={styles['text']}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'FFFFFF',
            borderRadiusSM: 2,
            colorWhite: '#2196F3',
            colorPrimaryBorder: '#2196F3',
          },
        }}
      >
        <Checkbox
          className={styles['transfer__item']}
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Все
        </Checkbox>
        <CheckboxGroup
          className={`${styles['transfer__item']}`}
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
}

export { TransferTickets };
