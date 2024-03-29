import React from 'react';

const DummyListData = ({
  user,
  deleteUser,
  loadUserDetail,
  editButtonClick,
  index,
  dataStore,
}) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{index + 1}</td>
          <td>
            <img
              src={
                user.image
                  ? user.image
                  : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000'
              }
              alt={user.firstName}
              style={{ width: '80px' }}
            />
          </td>
          <td>
            {user.firstName} {user.lastName}
          </td>
          <td>{user.age}</td>
          <td>{user.gender}</td>

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
            </button>{' '}
            &nbsp;
            <button
              onClick={() => dataStore(user)}
              type="button"
              className="btn btn-primary"
            >
              Data Store Array
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default DummyListData;
