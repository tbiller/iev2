import React from 'react';
import './style.css';

const HEADER_ROW_HEIGHT = '80px';
export default function App() {
  const headerRowRef = React.useRef();
  const stickyColRefs = React.useRef([]);

  React.useEffect(() => {
    function scrollListener() {
      headerRowRef.current.style.top = `${window.scrollY}px`;
      stickyColRefs.current.forEach(el => {
        el.style.left = `${window.scrollX}px`;
      });
    }
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  const rows = [];
  const headerRow = (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        height: HEADER_ROW_HEIGHT,
        borderBottom: '1px solid black'
      }}
      ref={headerRowRef}
    >
      <Row row={0} stickyColRefs={stickyColRefs} />
    </div>
  );
  for (let i = 1; i < 20; i++) {
    rows.push(<Row key={i} row={i} stickyColRefs={stickyColRefs} />);
  }
  return (
    <div className="App">
      {headerRow}
      <div style={{ paddingBottom: HEADER_ROW_HEIGHT }} />
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
        // border: row ==='1px solid white',
        textAlign: 'center'
      }}
    >
      <h3>{`${row}.${col}`}</h3>{' '}
    </div>
  );
};

const Row = ({ stickyColRefs, row }) => {
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
      <div
        ref={el => (stickyColRefs.current[row] = el)}
        style={{
          width: '400px',
          height: '80px',
          background: 'coral',
          position: 'absolute'
        }}
      >
        <h3 style={{ textAlign: 'center' }}>{row}</h3>
      </div>
      <div style={{ paddingLeft: '400px' }} />
      {cells}
    </div>
  );
};
