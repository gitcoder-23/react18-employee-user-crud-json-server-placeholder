import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { rootApi } from '../config';

const EmployeeList = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mesasge, setMessage] = useState('');

  const getAllEmployees = () => {
    setIsLoading(true);
    axios
      .get(`${rootApi}/employees`)
      .then((resData) => {
        console.log('resData->', resData);
        if (resData.status === 200) {
          if (resData.data.length === 0) {
            setIsLoading(false);
            setMessage('No Data Found!');
          } else {
            setIsLoading(false);
            setEmployeeData(resData.data.reverse());
          }
        } else {
          setIsLoading(false);
          setMessage('No Data Found!');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setMessage('Something Went Wrong!');
      });
  };

  useEffect(() => {
    getAllEmployees();

    // fetch(`${rootApi}/employees`)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((resp) => {
    //     console.log(resp);
    //   })
    //   .catch((err) => {
    //     console.log(err.mesasge);
    //   });

    return () => {};
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h1>Employee List</h1>
          <div className="card-body">
            {isLoading ? (
              <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : mesasge ? (
              <>
                <h1>{mesasge}</h1>
              </>
            ) : (
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>ID</td>
                    <td>Employee Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td colSpan={2}>Action</td>
                  </tr>
                </thead>

                {employeeData &&
                  employeeData?.map((eData, indx) => (
                    <tbody key={indx}>
                      <tr>
                        <td>{indx + 1}</td>
                        <td>Krishna</td>
                        <td>Krishna@yahoo.com</td>
                        <td>8888888888</td>
                        <td>
                          <button type="button" className="btn btn-info">
                            View
                          </button>{' '}
                          &nbsp;
                          <button type="button" className="btn btn-warning">
                            Edit
                          </button>{' '}
                          &nbsp;
                          <button type="button" className="btn btn-danger">
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
