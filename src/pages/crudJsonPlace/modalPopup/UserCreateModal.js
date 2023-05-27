import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserCreateModal = ({
  modalShow,
  setModalShow,
  // handleClose,
  userDatas,
  setUserDatas,
}) => {
  const [addMessage, setAddMessage] = useState('');

  const handleClose = () => setModalShow(false);

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

  return (
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
  );
};

export default UserCreateModal;
