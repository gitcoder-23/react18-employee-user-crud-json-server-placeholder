import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DummyListData from './DummyListData';
import DummyUserViewModal from './dummymodals/DummyUserViewModal';
import DummyUserEditModal from './dummymodals/DummyUserEditModal';
import DummyUserAddModal from './dummymodals/DummyUserAddModal';
import { toast } from 'react-toastify';

const DummyUserList = () => {
  const [userDatas, setUserDatas] = useState([] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [viewModalShow, setViewModalShow] = useState(false);
  const [viewUserData, setViewUserDara] = useState({} || null);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUserData, setEditUserData] = useState({});

  const [editUsersForm, setEditUsersForm] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: null,
  });

  const getAllUser = () => {
    setIsLoading(true);
    axios
      .get('https://dummyjson.com/users')
      .then((response) => {
        // console.log('dummy-response-->', response);
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

  const loadUserDetail = (userData) => {
    setViewUserDara(userData);
    setViewModalShow(true);
  };

  const editButtonClick = (userData) => {
    console.log('userData-->', userData);
    setEditUserData(userData);
    setEditModalShow(true);
  };

  const deleteUser = (userId) => {
    // console.log('userId-->', userId);

    if (window.confirm('Do you want?')) {
      const removeUser = [...userDatas].filter((uData, indx) => {
        return uData.id !== userId;
      });

      setUserDatas(removeUser);
    }
  };

  useEffect(() => {
    setEditUsersForm({
      id: editUserData?.id,
      firstName: editUserData?.firstName,
      lastName: editUserData?.lastName,
      email: editUserData?.email,
      phone: editUserData?.phone,
      age: editUserData?.age,
    });
  }, [editUserData]);

  return (
    <div className="container">
      <DummyUserViewModal
        viewModalShow={viewModalShow}
        viewUserData={viewUserData}
        setViewModalShow={setViewModalShow}
      />

      <DummyUserAddModal
        addModalShow={addModalShow}
        setAddModalShow={setAddModalShow}
        userDatas={userDatas}
        setUserDatas={setUserDatas}
      />

      <DummyUserEditModal
        editModalShow={editModalShow}
        setEditModalShow={setEditModalShow}
        editUserData={editUserData}
        setEditUsersForm={setEditUsersForm}
        editUsersForm={editUsersForm}
        userDatas={userDatas}
        setUserDatas={setUserDatas}
      />

      <div className="card">
        <div className="card-title">
          <h1>
            User List{' '}
            <button
              onClick={() => setAddModalShow(true)}
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
                    {/* <td>Gender</td> */}
                    <td>Email</td>
                    <td>Phone</td>
                    <td colSpan={2}>Action</td>
                  </tr>
                </thead>

                {userDatas &&
                  (userDatas || [])?.map((user, index) => {
                    return (
                      <DummyListData
                        user={user}
                        key={user.id}
                        index={index}
                        deleteUser={deleteUser}
                        loadUserDetail={loadUserDetail}
                        editButtonClick={editButtonClick}
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
