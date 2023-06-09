import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UserEditPopup = ({
  userDatas,
  setUserDatas,
  editModalShow,
  setEditModalShow,
  editUserData,
  editUsersForm,
  setEditUsersForm,
}) => {
  const [editMessage, setEditMessage] = useState('');

  const [success, setSuccess] = useState(false);

  useEffect(() => {}, [editUsersForm, userDatas]);

  const handleClose = () => setEditModalShow(false);

  const onTextFieldChange = (e) => {
    setEditUsersForm({
      ...editUsersForm,
      [e.target.name]: e.target.value,
    });
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
      // console.log('formData->', formData);

      axios
        .put(
          `https://jsonplaceholder.typicode.com/users/${editUserData?.id}`,
          formData
        )
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            const updateUser = [...userDatas].map((eData) => {
              if (eData.id === editUserData?.id) {
                eData.name = editUsersForm.name;
                eData.email = editUsersForm.email;
                eData.phone = editUsersForm.phone;
              }
              return eData;
            });
            setUserDatas([...updateUser]);

            setSuccess(true);

            toast.success('Form edited success!', {
              position: toast.POSITION.TOP_RIGHT,
            });
            setEditMessage('Form edited success!');

            setTimeout(() => {
              setEditUsersForm({
                name: '',
                email: '',
                phone: '',
              });
              setEditMessage('');
              setEditModalShow(false);
            }, 1000);
          } else {
            setSuccess(false);
            setEditMessage('Form edited failed! Something error');
            setTimeout(() => {
              setEditMessage('');
            }, 1000);
          }
        })
        .catch((err) => console.log('submit-err', err));
    }
  };
  // console.log('editUsersForm==>', editUsersForm);

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
