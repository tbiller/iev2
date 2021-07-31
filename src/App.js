import React from 'react';
import './style.css';

const HEADER_ROW_HEIGHT = '80px';

export default function App() {
  const fixedRowRef = React.useRef();
  const fixedColumnRef = React.useRef();
  const stickyColRefs = React.useRef([]);

  React.useEffect(() => {
    function windowScrollListener(e) {
      fixedRowRef.current.removeEventListener(
        'scroll',
        fixedColumnScrollListener
      );
      fixedRowRef.current.scrollLeft = window.scrollX;
      fixedRowRef.current.addEventListener('scroll', fixedColumnScrollListener);

      fixedColumnRef.current.removeEventListener(
        'scroll',
        fixedColumnScrollListener
      );
      fixedColumnRef.current.scrollTop = window.scrollY;
      fixedColumnRef.current.addEventListener(
        'scroll',
        fixedColumnScrollListener
      );
    }

    function fixedRowScrollListener(e) {
      window.removeEventListener('scroll', windowScrollListener);
      window.scroll(fixedRowRef.current.scrollLeft, window.scrollY);
      window.addEventListener('scroll', windowScrollListener);
    }

    function fixedColumnScrollListener(e) {
      window.removeEventListener('scroll', windowScrollListener);
      window.scroll(window.scrollX, fixedColumnRef.current.scrollTop);
      window.addEventListener('scroll', windowScrollListener);
    }

    window.addEventListener('scroll', windowScrollListener);
    fixedRowRef.current.addEventListener('scroll', fixedRowScrollListener);
    fixedColumnRef.current.addEventListener(
      'scroll',
      fixedColumnScrollListener
    );
    return () => {
      window.removeEventListener('scroll', windowScrollListener);
      fixedRowRef.current.removeEventListener('scroll', fixedRowScrollListener);
      fixedColumnRef.current.removeEventListener(
        'scroll',
        fixedColumnScrollListener
      );
    };
  }, []);

  const rows = [];
  const topCells = [];
  for (let col = 0; col < 20; col++) {
    topCells.push(<Cell key={col} row={0} col={col} />);
  }
  const fixedHeader = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        overflowX: 'scroll',
        height: HEADER_ROW_HEIGHT,
        borderBottom: '1px solid black'
      }}
      ref={fixedRowRef}
    >
      <Row row={0}>
        <FirstColumnCell row={0} />
        <div style={{ paddingLeft: '400px' }} />
        {topCells}
      </Row>
    </div>
  );

  for (let row = 1; row < 20; row++) {
    const cells = [];
    for (let col = 0; col < 20; col++) {
      cells.push(<Cell key={col} row={row} col={col} />);
    }
    rows.push(
      <Row key={row} row={row}>
        <div style={{ paddingLeft: '400px' }} />
        {cells}
      </Row>
    );
  }

  const FixedColumn = ({ children }) => (
    <div
      style={{
        position: 'fixed',
        top: `${HEADER_ROW_HEIGHT}`,
        left: 0,
        bottom: 0,
        width: 'max-content',
        zIndex: 1,
        overflowY: 'scroll'
      }}
      ref={fixedColumnRef}
    >
      {children}
    </div>
  );
  console.log(rows[0]);
  return (
    <div className="App">
      {fixedHeader}
      <div style={{ paddingBottom: HEADER_ROW_HEIGHT }} />
      <FixedColumn>
        {rows.map((_, idx) => (
          <FirstColumnCell row={idx} />
        ))}
      </FixedColumn>
      {rows}
    </div>
  );
}

const Cell = ({ row, col }) => {
  return (
    <div
      style={{
        width: '80px',
        height: '80px',
        background: 'lightblue',
        textAlign: 'center'
      }}
    >
      <h3>{`${row}.${col}`}</h3>{' '}
    </div>
  );
};

const Row = ({ stickyColRefs, row, children }) => {
  const cells = [];
  for (let i = 0; i < 20; i++) {
    cells.push(<Cell key={i} row={row} col={i} />);
  }
  return (
    <div
      style={{
        display: 'flex',
        width: 'max-content'
      }}
    >
      {children}
    </div>
  );
};

const FirstColumnCell = ({ row }) => (
  <div
    style={{
      width: '400px',
      height: '80px',
      background: 'coral',
      position: row === 0 ? 'fixed' : 'relative',
      top: row === 0 ? 0 : undefined,
      left: row === 0 ? 0 : undefined
    }}
  >
    <h3 style={{ textAlign: 'center' }}>{row}</h3>
  </div>
);
