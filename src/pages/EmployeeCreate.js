import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { rootApi } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ReactQuill from 'react-quill';

import ToastMessage from '../components/ToastMessage';

const EmployeeCreate = () => {
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [active, setActivechange] = useState(false);
  const [validation, setValidation] = useState(false);
  const [performance, setPerformance] = useState('good');
  const [employeeFullDetail, setEmployeeFullDetail] = useState('');

  const [employeeForm, setEmployeeForm] = useState({
    id: uuidv4(),
    employeename: '',
    email: '',
    phone: '',
    gender: '',
    emp_detail: '',
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
    // console.log('onFieldChange', employeeForm);
  };

  // console.log('active', active);

  const submitClick = () => {
    if (
      !employeeForm.employeename ||
      !employeeForm.email ||
      !employeeForm.phone ||
      technology.length === 0 ||
      !employeeForm.gender ||
      !employeeForm.emp_detail

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
        gender: employeeForm.gender,
        emp_detail: employeeForm.emp_detail,
        performance: performance,
        employeeFullDetail: JSON.stringify(employeeFullDetail),
        active: active,
      };
      // console.log('formData->', formData);

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
                gender: '',
                emp_detail: '',
              });
              setTechnology([]);
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
    // console.log('option->', option);
    setTechnology([...option]);
  };

  const onRadioChange = (radioVal) => {
    setPerformance(radioVal.target.value);
  };

  // const onFullDetailChnage = (detail) => {
  //   console.log('detail-->', detail);

  //   setEmployeeFullDetail(detail.target.value);
  // };

  console.log('employeeFullDetail-->', employeeFullDetail);

  return (
    <div className="container ">
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
                      <div className="form-group">
                        <label style={{ float: 'left', marginBottom: '4px' }}>
                          Gender
                        </label>
                        <select
                          className="form-control"
                          id="gender"
                          name="gender"
                          value={employeeForm.gender}
                          onChange={(e) => onFieldChange(e)}
                        >
                          <option value="">---Select---</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Others</option>
                        </select>
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
                          value={technology}
                          onChange={(option) => onChangeSelect(option)}
                          components={animatedComponents}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 mb-2">
                      <div className="form-group">
                        <div className="row">
                          <label
                            style={{
                              float: 'left',
                              marginBottom: '4px',
                              textAlign: 'left',
                            }}
                          >
                            Employee Performance
                          </label>{' '}
                        </div>
                        <div className="pr_class" style={{ textAlign: 'left' }}>
                          {' '}
                          Good{' '}
                          <input
                            type="radio"
                            name="performance"
                            value="good"
                            onChange={(e) => onRadioChange(e)}
                            checked={performance === 'good' ? true : false}
                          />{' '}
                          Better{' '}
                          <input
                            type="radio"
                            name="performance"
                            value="better"
                            onChange={(e) => onRadioChange(e)}
                            checked={performance === 'better' ? true : false}
                          />{' '}
                          Best{' '}
                          <input
                            type="radio"
                            name="performance"
                            value="best"
                            onChange={(e) => onRadioChange(e)}
                            checked={performance === 'best' ? true : false}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 mb-2">
                      <div className="form-group">
                        <div className="row">
                          <label
                            style={{
                              float: 'left',
                              marginBottom: '4px',
                              textAlign: 'left',
                            }}
                          >
                            Employee Details
                          </label>{' '}
                        </div>

                        <textarea
                          className="form-control"
                          name="emp_detail"
                          id="emp_detail"
                          value={employeeForm.emp_detail}
                          onChange={(e) => onFieldChange(e)}
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
                          {active === false ? 'Inactive' : 'Active'} Employee
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12 mb-2">
                      <div className="form-group">
                        <div className="row">
                          <label
                            style={{
                              float: 'left',
                              marginBottom: '4px',
                              textAlign: 'left',
                            }}
                          >
                            Employee full details
                          </label>{' '}
                        </div>

                        <ReactQuill
                          theme="snow"
                          value={employeeFullDetail}
                          onChange={setEmployeeFullDetail}
                        />
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
  text-align: left !important;
}

`;
