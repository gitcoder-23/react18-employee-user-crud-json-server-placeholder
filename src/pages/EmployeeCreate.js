import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { rootApi } from '../config';

const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [active, setActivechange] = useState(false);
  const [validation, setValidation] = useState(false);
  const [employeeForm, setEmployeeForm] = useState({
    id: uuidv4(),
    employeename: '',
    email: '',
    phone: '',
  });

  const onFieldChange = (e) => {
    setEmployeeForm({
      ...employeeForm,
      [e.target.name]: e.target.value,
    });
    // console.log('onFieldChange', employeeForm);
  };

  // console.log('active', active);

  const submitClick = () => {
    if (
      !employeeForm.employeename ||
      !employeeForm.email ||
      !employeeForm.phone
      // active === false
    ) {
      setSuccess(false);
      setMessage('Please fill all the fields!');
      setTimeout(() => {
        setMessage('');
      }, 1500);
    } else {
      let formData = {
        id: employeeForm.id,
        employeename: employeeForm.employeename,
        email: employeeForm.email,
        phone: employeeForm.phone,
        active: active,
      };
      console.log('formData->', formData);

      axios
        .post(`${rootApi}/employees`, formData)
        .then((data) => {
          console.log(data);
          if (data.status === 201) {
            setSuccess(true);
            setMessage('Form submitted success!');

            setTimeout(() => {
              setEmployeeForm({
                employeename: '',
                email: '',
                phone: '',
              });
              setActivechange(false);
              navigate('/');
            }, 1000);

            setTimeout(() => {
              setMessage('');
            }, 1500);
          } else {
            setSuccess(false);
            setMessage('Form submitted failed! Something error');
            setTimeout(() => {
              setMessage('');
            }, 1500);
          }
        })
        .catch((err) => console.log('submit-err', err));

      // fetch("http://localhost:8000/employee",{
      //   method:"POST",
      //   headers:{"content-type":"application/json"},
      //   body:JSON.stringify(empdata)
      // }).then((res)=>{
      //   alert('Saved successfully.')
      //   navigate('/');
      // }).catch((err)=>{
      //   console.log(err.message)
      // })
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <div className="container">
            <div className="card">
              <div className="card-title">
                <h2>Employee Add</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col col-lg-12 col-md-12 col-sm-12">
                    <div className="col-lg-12 mb-2">
                      <div className="form-group">
                        <label style={{ float: 'left', marginBottom: '4px' }}>
                          Employee Name
                        </label>
                        <input
                          id="employeename"
                          name="employeename"
                          required
                          value={employeeForm.employeename}
                          onMouseDown={(e) => setValidation(true)}
                          onChange={(e) => onFieldChange(e)}
                          className="form-control"
                          placeholder="Type name here"
                        />
                        {employeeForm.employeename.length === 0 &&
                          validation && (
                            <div style={{ textAlign: 'left' }}>
                              <span className="text-danger">
                                Enter employee name
                              </span>
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
                          value={employeeForm.email}
                          onChange={(e) => onFieldChange(e)}
                          onMouseDown={(e) => setValidation(true)}
                          className="form-control"
                          placeholder="Type email here"
                        />
                        {employeeForm.email.length === 0 && validation && (
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
                          value={employeeForm.phone}
                          onChange={(e) => onFieldChange(e)}
                          onMouseDown={(e) => setValidation(true)}
                          className="form-control"
                          placeholder="Type phone here"
                        />
                        {employeeForm.phone.length === 0 && validation && (
                          <div style={{ textAlign: 'left' }}>
                            <span className="text-danger">Enter email</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 mb-2">
                      <div className="form-check">
                        <input
                          checked={active}
                          onChange={(e) => setActivechange(e.target.checked)}
                          type="checkbox"
                          className="form-check-input"
                        />
                        <label
                          className="form-check-label"
                          style={{ float: 'left', marginBottom: '4px' }}
                        >
                          {active == false ? 'Inactive' : 'Active'} Employee
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12" style={{ width: '100%' }}>
                      <div className=" " style={{ float: 'left' }}>
                        <button
                          type="button"
                          onClick={submitClick}
                          className="btn btn-primary "
                        >
                          Submit
                        </button>
                        <Link to={'/'} className="btn btn-secondary mx-2">
                          Back
                        </Link>
                      </div>
                      {message && (
                        <h3
                          className="pt-2"
                          style={{
                            color: `${success === true ? 'green' : 'red'}`,
                            fontSize: '18px',
                          }}
                        >
                          {message}
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreate;
