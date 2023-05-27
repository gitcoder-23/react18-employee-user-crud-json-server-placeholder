import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';

const UserDetail = () => {
  const { state } = useLocation();
  // console.log('View-sData=>', state?.singleUser);
  const { uId } = useParams();
  // console.log('uId==>', uId);
  const [singleUserData, setSingleUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getUserDetail = () => {
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${uId}`)
      .then((response) => {
        // console.log('response-->', response);
        if (response.status === 200) {
          if (response.data.length === 0) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setSingleUserData(response.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserDetail();

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
  }, [state?.singleUser, uId]);
  return (
    <div>
      <div className="container">
        <div className="card row py-4" style={{ textAlign: 'left' }}>
          <div className="card-title">
            <h2>
              <u>User Detail</u>
            </h2>
          </div>
          <div className="card-body"></div>

          {isLoading ? (
            <div className="container">
              <Loader />
            </div>
          ) : (
            <div>
              <h2>
                The User name is : <b>{singleUserData.name}</b>
              </h2>
              <h6>
                <b>User Id:</b> {singleUserData.id}
              </h6>
              <h3>Contact Details</h3>
              <h5>Email is : {singleUserData.email}</h5>
              <h5>Phone is : {singleUserData.phone}</h5>
              <Link className="btn btn-secondary" to="/userlist">
                Back to List
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
