import React from 'react';
import { Spinner } from 'react-bootstrap';

class Loading extends React.Component {
  render() {
    return (
      <div data-testid="page-loading" className="d-flex align-items-center m-3">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
}

export default Loading;
