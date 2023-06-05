import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DummyListData from './DummyListData';

const DummyUserList = () => {
  const [userDatas, setUserDatas] = useState([] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [viewUserData, setViewUserDara] = useState({} || null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUserData, setEditUserDara] = useState({});

  const getAllUser = () => {
    setIsLoading(true);
    axios
      .get('https://dummyjson.com/users')
      .then((response) => {
        console.log('dummy-response-->', response);
        if (response.status === 200) {
          if (response.data.users.length === 0) {
            setIsLoading(false);
            setMessage('No user found!!');
          } else {
            setIsLoading(false);
            setUserDatas(response.data.users);
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

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h1>
            User List{' '}
            <button
              onClick={() => setModalShow(true)}
              className="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Add New (+)
            </button>
          </h1>
          <div className="card-body">
            {isLoading ? (
              <h2>Data is loading..</h2>
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
                    <td>Employee Image</td>
                    <td>Employee Name</td>
                    <td>Age</td>
                    <td>Gender</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td colSpan={2}>Action</td>
                  </tr>
                </thead>

                {userDatas &&
                  userDatas.map((user, index) => {
                    return (
                      <DummyListData
                        user={user}
                        key={user.id}
                        // deleteUser={deleteUser}
                        // loadUserDetail={loadUserDetail}
                        // editButtonClick={editButtonClick}
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

export default DummyUserList;
