import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Menu from '../../../components/Menu';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
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
  const [addMessage, setAddMessage] = useState('');
  const [modalShow, setModalShow] = useState(false);

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

  const handleClose = () => setModalShow(false);
  const handleOpen = () => setModalShow(true);

  // Create

  const [success, setSuccess] = useState(false);
  const [validation, setValidation] = useState(false);
  const [userForm, setUserForm] = useState({
    id: uuidv4(),
    name: '',
    email: '',
    phone: '',
  });

  const onFieldChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
    // console.log('onFieldChange', userForm);
  };

  const submitClick = () => {
    if (!userForm.name || !userForm.email || !userForm.phone) {
      setSuccess(false);
      setAddMessage('Please fill all the fields!');

      setTimeout(() => {
        setAddMessage('');
      }, 1500);
    } else {
      let formData = {
        id: userForm.id,
        name: userForm.name,
        email: userForm.email,
        phone: userForm.phone,
      };
      console.log('formData->', formData);

      axios
        .post(`https://jsonplaceholder.typicode.com/users`, formData)
        .then((data) => {
          console.log('addedData->', data);
          if (data.status === 201) {
            setSuccess(true);
            setAddMessage('Form submitted success!');
            toast.success('Form submitted success!', {
              position: toast.POSITION.TOP_RIGHT,
            });

            setUserDatas([...userDatas, data?.data]);

            setTimeout(() => {
              setTimeout(() => {
                setUserForm({
                  name: '',
                  email: '',
                  phone: '',
                });
              }, 1000);
              setAddMessage('');

              handleClose();
            }, 1000);
          } else {
            setSuccess(false);

            setTimeout(() => {
              setAddMessage('');
            }, 1500);
          }
        })
        .catch((err) => {
          console.log('submit-err', err);
        });
    }
  };

  console.log('userDatas-->', userDatas);

  return (
    <div className="container">
      <ToastMessage />
      <Menu />

      {/* Modal */}
      <Modal
        show={modalShow}
        onHide={handleClose}
        animation={true}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>User Create</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body">
            <div className="row">
              <div className="col col-lg-12 col-md-12 col-sm-12">
                <div className="col-lg-12 mb-2">
                  <div className="form-group">
                    <label style={{ float: 'left', marginBottom: '4px' }}>
                      User Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={userForm.name}
                      onMouseDown={(e) => setValidation(true)}
                      onChange={(e) => onFieldChange(e)}
                      className="form-control"
                      placeholder="Type name here"
                    />
                    {userForm.name.length === 0 && validation && (
                      <div style={{ textAlign: 'left' }}>
                        <span className="text-danger">Enter employee name</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 mb-2">
                  <div className="form-group">
                    <label style={{ float: 'left', marginBottom: '4px' }}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      required
                      value={userForm.email}
                      onChange={(e) => onFieldChange(e)}
                      onMouseDown={(e) => setValidation(true)}
                      className="form-control"
                      placeholder="Type email here"
                    />
                    {userForm.email.length === 0 && validation && (
                      <div style={{ textAlign: 'left' }}>
                        <span className="text-danger">Enter email</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 mb-2">
                  <div className="form-group">
                    <label style={{ float: 'left', marginBottom: '4px' }}>
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      required
                      value={userForm.phone}
                      onChange={(e) => onFieldChange(e)}
                      onMouseDown={(e) => setValidation(true)}
                      className="form-control"
                      placeholder="Type phone here"
                    />
                    {userForm.phone.length === 0 && validation && (
                      <div style={{ textAlign: 'left' }}>
                        <span className="text-danger">Enter email</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {addMessage && (
            <h3
              className="pt-2"
              style={{
                color: `${success === true ? 'green' : 'red'}`,
                fontSize: '18px',
              }}
            >
              {addMessage}
            </h3>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitClick}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal End */}
      <div className="card">
        <div className="card-title">
          <h1>
            User List{' '}
            <button
              onClick={handleOpen}
              className="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Add New (+)
            </button>
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
