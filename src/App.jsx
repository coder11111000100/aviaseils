import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTickets } from './store/actionLoad/action';
import styles from './App.module.scss';
import { FilterTickets } from './FilterTicket/FilterTicket';
import { TicketsList } from './TicketsList/TicketsList';
import { TransferTickets } from './TransferTickets/TransferTickets';
import logo from './assets/Logo.png';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTickets());
  }, [dispatch]);
  return (
    <>
      <div className={styles['logo-header']}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles['container']}>
        <div className={styles['contaiter__transfers']}>
          <TransferTickets />
        </div>
        <div className={styles['contaiter__filterList']}>
          <FilterTickets />
          <TicketsList />
        </div>
      </div>
    </>
  );
}

export default App;
