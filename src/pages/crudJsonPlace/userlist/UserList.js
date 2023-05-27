import React, { useEffect, useState } from 'react';
import Menu from '../../../components/Menu';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../components/Loader';
import ListData from './ListData';
import ToastMessage from '../../../components/ToastMessage';
import { toast } from 'react-toastify';

const UserList = () => {
  const navigate = useNavigate();
  const [userDatas, setUserDatas] = useState([] | null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const getAllUser = () => {
    setIsLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        // console.log('response-->', response);
        if (response.status === 200) {
          if (response.data.length === 0) {
            setIsLoading(false);
            setMessage('No user found!!');
          } else {
            setIsLoading(false);
            setUserDatas(response.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage('Something went wrong!!');
      });
  };

  useEffect(() => {
    getAllUser();
    return () => {};
  }, []);

  // console.log('userDatas-->', userDatas);

  const loadUserDetail = (userId) => {
    console.log('userId->', userId);
    navigate(`/viewuser/${userId}`, {
      state: { singleUser: userId },
    });
  };

  const deleteUser = (userId) => {
    // console.log('userId-->', userId);

    if (window.confirm('Do you want?')) {
      const removeUser = [...userDatas].filter((uData, indx) => {
        return uData.id !== userId;
      });
      toast.error('Deleted success!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setUserDatas(removeUser);
    }
  };

  return (
    <div className="container">
      <ToastMessage />
      <Menu />
      <div className="card">
        <div className="card-title">
          <h1>
            User List{' '}
            <Link to={''} className="btn btn-success">
              Add New (+)
            </Link>
          </h1>
          <div className="card-body">
            {isLoading ? (
              <Loader />
            ) : message ? (
              <>
                <h2>{message}</h2>
              </>
            ) : userDatas.length === 0 ? (
              <h2>No user found!!</h2>
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

                {userDatas &&
                  userDatas.map((user, index) => {
                    return (
                      <ListData
                        user={user}
                        key={user.id}
                        deleteUser={deleteUser}
                        loadUserDetail={loadUserDetail}
                      />
                    );
                  })}
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
