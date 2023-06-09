import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DummyUserEditModal = ({
  userDatas,
  editModalShow,
  setEditModalShow,
  editUserData,
  setEditUsersForm,
  editUsersForm,
  setUserDatas,
}) => {
  console.log('editUserData-->', editUserData);
  const [editMessage, setEditMessage] = useState('');
  const [edId, setEdId] = useState(null);

  const [success, setSuccess] = useState(false);

  // const genderData = {
  //   male: 'Male',
  //   female: 'Female',
  //   others: 'Others',
  // };

  const genderData = [
    {
      id: 1,
      value: 'male',
      label: 'Male',
    },
    {
      id: 2,
      value: 'female',
      label: 'Female',
    },
    {
      id: 3,
      value: 'others',
      label: 'Others',
    },
  ];

  useEffect(() => {}, [editUsersForm, userDatas]);

  const onTextFieldChange = (e) => {
    setEditUsersForm({
      ...editUsersForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditsubmit = () => {
    const updateUser = [...userDatas].map((eData) => {
      setEdId(eData.id);
      if (eData.id === editUserData?.id) {
        eData.firstName = editUsersForm.firstName;
        eData.lastName = editUsersForm.lastName;
        eData.email = editUsersForm.email;
        eData.phone = editUsersForm.phone;
        eData.age = editUsersForm.age;
        eData.gender = editUsersForm.gender;
      }
      return eData;
    });
    setUserDatas([...updateUser]);
    setSuccess(true);

    setEditMessage('Form edited success!');
    setTimeout(() => {
      setEditMessage('');
      setEditModalShow(false);
    }, 1000);
  };

  return (
    <Modal
      show={editModalShow}
      onHide={() => setEditModalShow(false)}
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
                    <label>First Name</label>
                    <input
                      name="firstName"
                      id="firstName"
                      value={editUsersForm?.firstName}
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
                      value={editUsersForm?.lastName}
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
                      value={editUsersForm?.age}
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
                      defaultValue={editUserData?.gender}
                      onChange={(e) => onTextFieldChange(e)}
                    >
                      <option value="">--Select option--</option>

                      {genderData &&
                        genderData.map((gen, i) => (
                          <option
                            value={gen.value}
                            key={i}
                            selected={editUserData.gender === gen.id}
                          >
                            {gen.label}
                          </option>
                        ))}

                      {/* {Object.keys(genderData).map((gData) => {
                        console.log(gData);
                        return (
                          <option value={gData} name={gData}>
                            {gData === 'male'
                              ? 'Male'
                              : gData === 'female'
                              ? 'Female'
                              : 'Others'}
                          </option>
                        );
                      })} */}
                    </select>
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
        <Button variant="secondary" onClick={() => setEditModalShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditsubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DummyUserEditModal;
