import React from 'react';

const ListData = ({ user, deleteUser, loadUserDetail, editButtonClick }) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>

          <td>
            <button
              onClick={() => loadUserDetail(user)}
              type="button"
              className="btn btn-info"
            >
              View
            </button>{' '}
            &nbsp;
            <button
              onClick={() => editButtonClick(user)}
              type="button"
              className="btn btn-warning"
            >
              Edit
            </button>{' '}
            &nbsp;
            <button
              onClick={() => deleteUser(user.id)}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default ListData;
