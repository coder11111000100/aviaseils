import { useSelector } from 'react-redux';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Alert, Spin } from 'antd';

import { superSelector } from '../store/filters/selector';
import styles from './TicketsList.module.scss';
import { Ticket } from '../Ticket/Ticket';

function TicketsList() {
  const tickets = useSelector(superSelector);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const [countTickets, setCountTickets] = useState(5);
  const sliceTickets = tickets.slice(0, countTickets);

  if (error) {
    return (
      <div className={styles['warning']}>
        <span> an error has occurred and we will fix it soon </span>
      </div>
    );
  }

  if (!error && loading) {
    return (
      <Spin tip="Loading...">
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
    );
  }

  return (
    <>
      {!tickets.length && !loading ? (
        <div className={styles['warning']}>
          <span> select the number of transfers </span>
        </div>
      ) : (
        sliceTickets.map((item) => <Ticket key={nanoid(4)} data={item} />)
      )}
      {!tickets.length && !loading ? null : (
        <button type="button" onClick={() => setCountTickets((prev) => prev + 5)} className={styles['button-ticket']}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      )}
    </>
  );
}

export { TicketsList };
