import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import * as icon from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const DummyStoreEmployeeModal = ({
  storeData,
  showEmpModal,
  setShowEmpModal,
  setStoreData,
}) => {
  const delEmployee = (delId) => {
    console.log('delId->', delId);
    if (window.confirm('Do you want?')) {
      const removeUser = [...storeData].filter((uData, indx) => {
        return uData.id !== delId;
      });

      setStoreData(removeUser);
    }
  };
  return (
    <Modal
      show={showEmpModal}
      onHide={() => setShowEmpModal(false)}
      animation={true}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Selected Employee -- {storeData.length}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          {storeData &&
            storeData.map((sData, idx) => {
              return (
                <tbody>
                  <tr>
                    <td>{idx + 1}</td>
                    <td>
                      {sData.firstName} {sData.lastName}
                    </td>
                    <td>{sData.email}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => delEmployee(sData.id)}
                      >
                        {' '}
                        <CIcon
                          icon={icon.cilTrash}
                          size="l"
                          style={{ color: '#fff' }}
                        />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default DummyStoreEmployeeModal;
