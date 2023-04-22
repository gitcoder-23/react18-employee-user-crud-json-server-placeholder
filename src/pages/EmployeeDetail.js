import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const { state } = useLocation();
  // console.log('View-sData=>', state?.singleUser);
  const { empId } = useParams();

  // const getOneUser = async () => {
  //   try {
  //     const oneUser = await axios.get(`${rootApi}/employees/${empId}`);
  //     console.log('oneUser', oneUser);
  //   } catch (err) {
  //     console.log('Something went wrong!', err);
  //   }
  // };
  // useEffect(() => {
  //   getOneUser();
  // }, []);

  useEffect(() => {
    return () => {};
  }, [state?.singleUser, empId]);

  return (
    <div>
      <div className="container">
        <div className="card row py-4" style={{ textAlign: 'left' }}>
          <div className="card-title">
            <h2>
              <u>Employee Detail</u>
            </h2>
          </div>
          <div className="card-body"></div>

          {state?.singleUser && (
            <div>
              <h2>
                The Employee name is : <b>{state?.singleUser.employeename}</b>
              </h2>
              <h6>
                <b>Employee Id:</b> {state?.singleUser.id}
              </h6>
              <h3>Contact Details</h3>
              <h5>Email is : {state?.singleUser.email}</h5>
              <h5>Phone is : {state?.singleUser.phone}</h5>
              <Link className="btn btn-secondary" to="/">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
