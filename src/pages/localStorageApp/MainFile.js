import React, { useState } from 'react';
import { useEffect } from 'react';

const MainFile = () => {
  const [allTextData, setAllTextData] = useState([]);
  const [allLocalStorageData, setAllLocalStorageData] = useState([]);
  const [inputField, setInputField] = useState('');

  const addClick = () => {
    const newData = {
      id: Date.now(),
      textData: inputField,
    };
    setAllTextData([...allTextData, newData]);
    localStorage.setItem('userdata', JSON.stringify([...allTextData, newData]));
    setInputField('');
  };

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('userdata'));
    console.log('localStorageData=>', localStorageData);
    if (localStorageData) {
      setAllLocalStorageData(localStorageData);
    }

    return () => {};
  }, [allTextData, allLocalStorageData]);

  console.log('allLocalStorageData=>', allLocalStorageData);

  return (
    <div className="container main_file m-4">
      <div className="input_field">
        <input
          type="text"
          name="text_input"
          value={inputField}
          onChange={(e) => setInputField(e.target.value)}
        />
        &nbsp;
        <button type="button" onClick={() => addClick()}>
          Add
        </button>
      </div>
      <div className="data_list mt-4">
        {allLocalStorageData.length === 0 ? (
          <h3>No data found!</h3>
        ) : (
          <>
            <h3>Data List</h3>
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <th>#Sl.No</th>
                  <th>Data</th>
                </tr>
              </thead>
              {allLocalStorageData &&
                allLocalStorageData.map((result, indx) => {
                  return (
                    <tbody key={result.id}>
                      <tr>
                        <td>{indx + 1}</td>
                        <td>{result.textData}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default MainFile;
