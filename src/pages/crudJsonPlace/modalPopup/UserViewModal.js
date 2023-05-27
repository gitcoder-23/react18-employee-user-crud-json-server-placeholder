import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Loader from '../../../components/Loader';

const UserViewModal = ({ viewModalShow, viewUserData, setViewModalShow }) => {
  // console.log('viewUserData-->', viewUserData);
  const handleClose = () => setViewModalShow(false);

  useEffect(() => {
    return () => {};
  }, [viewUserData]);

  return (
    <Modal
      show={viewModalShow}
      onHide={handleClose}
      animation={true}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>User Create</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="container">
            <div className="card row py-4" style={{ textAlign: 'left' }}>
              <div className="card-title">
                <h2>
                  <u>User Detail</u>
                </h2>
              </div>
              <div className="card-body"></div>

              {viewUserData === null ? (
                <div className="container">
                  <Loader />
                </div>
              ) : (
                <div>
                  <h2>
                    The User name is : <b>{viewUserData?.name}</b>
                  </h2>
                  <h6>
                    <b>User Id:</b> {viewUserData?.id}
                  </h6>
                  <h3>Contact Details</h3>
                  <h5>Email is : {viewUserData?.email}</h5>
                  <h5>Phone is : {viewUserData?.phone}</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserViewModal;
