import React from 'react';

const DummySearch = ({ getSearch, search, updateSearch }) => {
  return (
    <form onSubmit={getSearch} className="search-form">
      <input
        className="form-control me-sm-2"
        placeholder="Search department"
        style={{
          height: '35px',
          display: 'initial',
          padding: '0 5px',
          width: '70%',
          fontSize: '14px',
        }}
        type="text"
        value={search}
        onChange={updateSearch}
      />

      <button
        className="btn btn-primary my-2 my-sm-0"
        style={{
          height: '35px',
          padding: '0 5px',
          width: '20%',
        }}
        type="submit"
      >
        Reset
      </button>
    </form>
  );
};

export default DummySearch;
