import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const DummyUserAddModal = ({
  addModalShow,
  setAddModalShow,
  userDatas,
  setUserDatas,
}) => {
  const [addMessage, setAddMessage] = useState('');

  const [success, setSuccess] = useState(false);
  const [addUserForm, setAddUserForm] = useState({
    id: Date.now(),
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: null,
    gender: '',
  });

  const onTextFieldChange = (e) => {
    setAddUserForm({
      ...addUserForm,
      [e.target.name]: e.target.value,
    });
    // console.log('onFieldChange', userForm);
  };
  const submitClick = () => {
    if (
      !addUserForm.firstName ||
      !addUserForm.lastName ||
      !addUserForm.email ||
      !addUserForm.phone ||
      !addUserForm.age ||
      !addUserForm.gender
    ) {
      setSuccess(false);
      setAddMessage('Please fill all the fields!');

      setTimeout(() => {
        setAddMessage('');
      }, 1500);
    } else {
      let newFormValue = {
        id: addUserForm.id,
        firstName: addUserForm.firstName,
        lastName: addUserForm.lastName,
        email: addUserForm.email,
        phone: addUserForm.phone,
        age: addUserForm.age,
        gender: addUserForm.gender,
      };
      setUserDatas([...userDatas, newFormValue]);
      setSuccess(true);
      setAddMessage('User created!');

      setTimeout(() => {
        setAddUserForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          age: null,
          gender: '',
        });
        setAddMessage('');
        setAddModalShow(false);
      }, 2000);
    }
  };
  console.log('gender-->', addUserForm?.gender);
  return (
    <Modal
      show={addModalShow}
      onHide={() => setAddModalShow(false)}
      animation={true}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>User Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="container">
          <div className="card" style={{ textAlign: 'left' }}>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      name="firstName"
                      id="firstName"
                      value={addUserForm?.firstName}
                      onChange={(e) => onTextFieldChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      name="lastName"
                      id="lastName"
                      value={addUserForm?.lastName}
                      onChange={(e) => onTextFieldChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Age</label>
                    <input
                      name="age"
                      id="age"
                      value={addUserForm?.age}
                      onChange={(e) => onTextFieldChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      className="form-control"
                      id="gender"
                      name="gender"
                      onChange={(e) => onTextFieldChange(e)}
                    >
                      <option value="">---Select---</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      id="email"
                      value={addUserForm?.email}
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
                      value={addUserForm?.phone}
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
        <Button variant="secondary" onClick={() => setAddModalShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={submitClick}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DummyUserAddModal;
