import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UserEditPopup = ({
  editModalShow,
  setEditModalShow,
  editUserData,
  setEditUserDara,
}) => {
  console.log('editUserData==>', editUserData);
  const [editMessage, setEditMessage] = useState('');

  const [success, setSuccess] = useState(false);
  const [validation, setValidation] = useState(false);
  const [oneUser, setOneUser] = useState({});

  const [editUsersForm, setEditUsersForm] = useState({
    id: oneUser?.id || '',
    name: oneUser?.name || '',
    email: oneUser?.email || '',
    phone: oneUser?.phone || '',
  });
  const getOneUser = async () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${editUserData?.id}`)
      .then((uData) => {
        console.log('udata==>', uData);
        setOneUser(uData?.data);
      });
  };

  const handleClose = () => setEditModalShow(false);

  const onTextFieldChange = (e) => {
    setEditUsersForm({
      ...editUsersForm,
      [e.target.name]: e.target.value,
    });
    // console.log('onFieldChange', editUsersForm);
  };

  const handlesubmit = () => {
    if (!editUsersForm.name || !editUsersForm.email || !editUsersForm.phone) {
      setSuccess(false);
      setEditMessage('Please fill all the fields!');
      setTimeout(() => {
        setEditMessage('');
      }, 1500);
    } else {
      let formData = {
        name: editUsersForm.name,
        email: editUsersForm.email,
        phone: editUsersForm.phone,
      };
      console.log('formData->', formData);

      axios
        .put(
          `https://jsonplaceholder.typicode.com/users/${editUserData?.id}`,
          formData
        )
        .then((data) => {
          console.log(data);
          // if (data.status === 200) {
          //   setSuccess(true);
          //   setEditMessage('Form edited success!');

          //   setTimeout(() => {
          //     setEditUsersForm({
          //       name: '',
          //       email: '',
          //       phone: '',
          //     });
          //   }, 1000);

          //   setTimeout(() => {
          //     setEditMessage('');
          //   }, 1500);
          // } else {
          //   setSuccess(false);
          //   setEditMessage('Form edited failed! Something error');
          //   setTimeout(() => {
          //     setEditMessage('');
          //   }, 1500);
          // }
        })
        .catch((err) => console.log('submit-err', err));
    }
  };

  useEffect(() => {
    getOneUser();
  }, []);
  console.log('editUsersForm@@@-->', editUsersForm, oneUser);

  const [oneUser1, setOneUser1] = useState(oneUser?.id);
  console.log('oneUser1@@@-->', oneUser1);

  return (
    <Modal
      show={editModalShow}
      onHide={handleClose}
      animation={true}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>User Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="container">
          <div className="card" style={{ textAlign: 'left' }}>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>ID</label>
                    <input
                      value={editUsersForm?.id}
                      disabled="disabled"
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>User Name</label>
                    <input
                      name="name"
                      id="name"
                      value={editUsersForm?.name}
                      onChange={(e) => onTextFieldChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      id="email"
                      value={editUsersForm?.email}
                      onChange={(e) => onTextFieldChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      name="phone"
                      id="phone"
                      value={editUsersForm?.phone}
                      onChange={(e) => onTextFieldChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <button className="btn btn-success" type="submit">
                      Save
                    </button>{' '}
                    &nbsp;
                  </div>
                  {editMessage && (
                    <h3
                      className="pt-2"
                      style={{
                        color: `${success === true ? 'green' : 'red'}`,
                        fontSize: '18px',
                      }}
                    >
                      {editMessage}
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {editMessage && (
          <h3
            className="pt-2"
            style={{
              color: `${success === true ? 'green' : 'red'}`,
              fontSize: '18px',
            }}
          >
            {editMessage}
          </h3>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlesubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserEditPopup;
