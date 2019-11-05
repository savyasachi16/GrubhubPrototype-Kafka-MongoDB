import React, { Component }  from 'react';

const PageListRenderer = ({ pages, onPageChange }) => {
    const pageWithoutIndication = pages.filter(p => typeof p.page !== "string");
    return (
      <div>
        {pageWithoutIndication.map(p => (
          <button
            className="btn btn-success"
            onClick={() => onPageChange(p.page)}
          >
            {p.page}
          </button>
        ))}
      </div>
    );
  };
  
  export default PageListRenderer;