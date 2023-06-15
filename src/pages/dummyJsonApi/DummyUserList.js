import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DummyListData from './DummyListData';
import DummyUserViewModal from './dummymodals/DummyUserViewModal';
import DummyUserEditModal from './dummymodals/DummyUserEditModal';
import DummyUserAddModal from './dummymodals/DummyUserAddModal';
import DummySearch from './DummySearch';
import { Button } from 'react-bootstrap';
import DummyStoreEmployeeModal from './dummymodals/DummyStoreEmployeeModal';

const DummyUserList = () => {
  const [userDatas, setUserDatas] = useState([] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [viewModalShow, setViewModalShow] = useState(false);
  const [viewUserData, setViewUserDara] = useState({} || null);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const [storeData, setStoreData] = useState([]);

  const [showEmpModal, setShowEmpModal] = useState(false);
  // Search
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const [editUsersForm, setEditUsersForm] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: null,
    gender: '',
  });

  const getAllUser = () => {
    setIsLoading(true);
    axios
      .get('https://dummyjson.com/users')
      .then((response) => {
        // console.log('dummy-response-->', response.data);
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
    // console.log('userData-->', userData);
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
      gender: editUserData?.gender,
    });
  }, [editUserData]);

  // Search
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    // to reset after search button click
    setSearch('');
  };

  const updateSearch = (evt) => {
    setSearch(evt.target.value);
  };

  const dataStore = (dItem) => {
    console.log('dItem-->', dItem);
    if (storeData.indexOf(dItem) !== -1) return;
    setStoreData([...storeData, dItem]);
  };

  console.log('storeData-->', storeData);

  const showEmployee = () => {
    setShowEmpModal(true);
  };

  const delEmployee = (delId) => {
    console.log('delId->', delId);
    if (window.confirm('Do you want?')) {
      const removeUser = [...storeData].filter((uData, indx) => {
        return uData.id !== delId;
      });

      setStoreData(removeUser);
    }
  };

  const clearAllStore = () => {
    setStoreData([]);
    setTimeout(() => {
      setShowEmpModal(false);
    }, 1000);
  };

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

      <DummyStoreEmployeeModal
        storeData={storeData}
        setStoreData={setStoreData}
        showEmpModal={showEmpModal}
        setShowEmpModal={setShowEmpModal}
        delEmployee={delEmployee}
        clearAllStore={clearAllStore}
      />

      <div className="card">
        <div className="card-title">
          <h1>
            Employee List{' '}
            <button
              onClick={() => setAddModalShow(true)}
              className="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Add New (+)
            </button>
          </h1>

          {/* Search Start */}
          <div className="row">
            <div className="col-md-7">
              <DummySearch
                getSearch={getSearch}
                search={search}
                updateSearch={updateSearch}
              />
            </div>
            <div className="col-md-5">
              {storeData.length === 0 ? (
                <Button variant="secondary">No Employee Selected</Button>
              ) : (
                <Button variant="info" onClick={showEmployee}>
                  {storeData.length} Selected
                </Button>
              )}
            </div>
          </div>
          {/* Search End */}
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

                {/* {userDatas &&
                  (userDatas || [])?.map((user, index) => { */}

                {userDatas &&
                  (userDatas || [])
                    .filter((val) => {
                      // console.log('val-->', val);
                      if (search === '') {
                        return val;
                      } else if (
                        val.firstName
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return val;
                      } else if (
                        val.lastName
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return val;
                      } else if (
                        val.email.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      } else if (val.search) {
                        return val;
                      }
                    })
                    ?.map((user, index) => {
                      return (
                        <>
                          <DummyListData
                            user={user}
                            key={user.id}
                            index={index}
                            deleteUser={deleteUser}
                            loadUserDetail={loadUserDetail}
                            editButtonClick={editButtonClick}
                            dataStore={dataStore}
                          />
                        </>
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
