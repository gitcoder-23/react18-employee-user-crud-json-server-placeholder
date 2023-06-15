import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import * as icon from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const DummyStoreEmployeeModal = ({
  storeData,
  showEmpModal,
  setShowEmpModal,
  setStoreData,
  delEmployee,
  clearAllStore,
}) => {
  return (
    <Modal
      show={showEmpModal}
      onHide={() => setShowEmpModal(false)}
      animation={true}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Selected Employee -- {storeData.length}{' '}
          {storeData.length >= 1 && (
            <Button
              variant="danger"
              style={{ color: '#fff' }}
              onClick={clearAllStore}
            >
              Remove All
            </Button>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {storeData.length === 0 ? (
          <h2 style={{ textAlign: 'center' }}>No data found</h2>
        ) : (
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
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DummyStoreEmployeeModal;
