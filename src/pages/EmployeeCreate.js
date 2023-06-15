import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { rootApi } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import ToastMessage from '../components/ToastMessage';

const EmployeeCreate = () => {
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
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
  const techOptions = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'node', label: 'Node' },
  ];
  const [technology, setTechnology] = useState([]);

  const onFieldChange = (e) => {
    setEmployeeForm({
      ...employeeForm,
      [e.target.name]: e.target.value,
    });
    console.log('onFieldChange', employeeForm);
  };

  // console.log('active', active);

  const submitClick = () => {
    if (
      !employeeForm.employeename ||
      !employeeForm.email ||
      !employeeForm.phone ||
      technology.length === 0
      // active === false
    ) {
      setSuccess(false);
      setMessage('Please fill all the fields!');
      toast.warn('Please fill all the fields!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        setMessage('');
      }, 1500);
    } else {
      let formData = {
        id: employeeForm.id,
        employeename: employeeForm.employeename,
        email: employeeForm.email,
        phone: employeeForm.phone,
        technology: technology,
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
            toast.success('Form submitted success!', {
              position: toast.POSITION.TOP_RIGHT,
            });

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

            toast.error('Form submitted failed! Something error', {
              position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
              setMessage('');
            }, 1500);
          }
        })
        .catch((err) => {
          console.log('submit-err', err);
          toast.error(`${err.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });

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

  const onChangeSelect = (option) => {
    console.log('option->', option);
    setTechnology([...option]);
  };

  console.log('technology-->', technology);

  return (
    <div className="container">
      <ToastMessage />
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
                      <div className="form-group multiselect_field">
                        <div className="row">
                          <label
                            style={{
                              float: 'left',
                              marginBottom: '4px',
                              textAlign: 'left',
                            }}
                          >
                            Technology
                          </label>{' '}
                        </div>

                        <Select
                          isMulti
                          name="technology"
                          id="technology"
                          // defaultValue={techOptions}
                          options={techOptions}
                          placeholder="Add your skill"
                          closeMenuOnSelect={true}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          // value={technology}
                          onChange={(option) => onChangeSelect(option)}
                          components={animatedComponents}
                        />
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
      <style>{cssOps}</style>
    </div>
  );
};

export default EmployeeCreate;

const cssOps = `

.multiselect_field div#react-select-3-placeholder {
  text-align: left
}

`;
