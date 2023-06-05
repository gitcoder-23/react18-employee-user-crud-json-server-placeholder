import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { rootApi } from '../config';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ToastMessage from '../components/ToastMessage';
import { toast } from 'react-toastify';
import Menu from '../components/Menu';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([] || null);
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

  const loadDetail = (vData) => {
    console.log('vData->', vData.id);
    navigate(`/employee/detail/${vData.id}`, {
      state: { singleUser: vData },
    });
  };

  const loadEdit = (eData) => {
    navigate(`/employee/edit/${eData.id}`, {
      state: { singleUser: eData },
    });
  };

  const loadDelete = (dData) => {
    console.log('dData-->', dData);
    if (window.confirm('Do you want?')) {
      axios
        .delete(`${rootApi}/employees/${dData.id}`)
        .then((dData) => {
          console.log(dData);
          toast.error('Deleted success!', {
            position: toast.POSITION.TOP_RIGHT,
          });
          getAllEmployees();
        })
        .catch((err) => {
          console.log(err);
          getAllEmployees();
        });
    }

    // fetch(`${rootApi}/employees/` + dData.id, {
    //   method: 'DELETE',
    // })
    //   .then((res) => {
    //     alert('Removed successfully.');
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };

  // localStorage.setItem('countedNumber', JSON.stringify(number));

  // const storeCountedNum = JSON.parse(localStorage.getItem('countedNumber'));
  // console.log('storeCountedNum=>', storeCountedNum);

  return (
    <div className="container">
      <ToastMessage />
      <div className="card">
        <div className="card-title">
          <h1>
            Employee List{' '}
            <Link to={'/employee/create'} className="btn btn-success">
              Add New (+)
            </Link>
          </h1>
          <div className="card-body">
            {isLoading ? (
              <Loader />
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
                    <td>Status</td>
                    <td colSpan={2}>Action</td>
                  </tr>
                </thead>

                {employeeData &&
                  employeeData?.map((eData, indx) => (
                    <tbody key={indx}>
                      <tr>
                        <td>{indx + 1}</td>
                        <td>{eData.employeename}</td>
                        <td>{eData.email}</td>
                        <td>{eData.phone}</td>
                        <td>
                          <span
                            style={{
                              color: `${
                                eData.active === false ? 'red' : 'green'
                              }`,
                            }}
                          >
                            {' '}
                            {eData.active === false ? 'Inactive' : 'Active'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => loadDetail(eData)}
                            type="button"
                            className="btn btn-info"
                          >
                            View
                          </button>{' '}
                          &nbsp;
                          <button
                            onClick={() => loadEdit(eData)}
                            type="button"
                            className="btn btn-warning"
                          >
                            Edit
                          </button>{' '}
                          &nbsp;
                          <button
                            onClick={() => loadDelete(eData)}
                            type="button"
                            className="btn btn-danger"
                          >
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
