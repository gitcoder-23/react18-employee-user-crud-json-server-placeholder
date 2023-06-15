import axios from 'axios';
import { rootApi } from '../config';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const EmployeeEdit = () => {
  const animatedComponents = makeAnimated();
  const { state } = useLocation();
  const { empId } = useParams();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  console.log('edit-eData=>', state?.singleUser);
  const navigate = useNavigate();
  const [employeeEditForm, setEmployeeEditForm] = useState({
    id: state?.singleUser.id || '',
    employeename: state?.singleUser.employeename || '',
    email: state?.singleUser.email || '',
    phone: state?.singleUser.phone || '',
  });
  const [active, setActivechange] = useState(state?.singleUser.active || false);
  const [selectedSkill, setSelectedSkill] = useState(
    state?.singleUser.technology || []
  );

  useEffect(() => {
    return () => {};
  }, [state?.singleUser, empId]);

  // const getStudent = async () => {
  //   try {
  //     const oneStudent = await axios.get(`${rootApi}/employees/${empId}`);
  //     console.log('oneStudent', oneStudent);
  //     const { data, status } = oneStudent;
  //     if (status == 200) {
  //       setTimeout(() => {
  //         setEmployeeEditForm(data);
  //       }, 600);
  //     }
  //   } catch (error) {
  //     console.log('Something went wrong!');
  //   }
  // };

  const onTextFieldChange = (e) => {
    setEmployeeEditForm({
      ...employeeEditForm,
      [e.target.name]: e.target.value,
    });
    // console.log('onTextFieldChange', studentState);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (
      !employeeEditForm.employeename ||
      !employeeEditForm.email ||
      !employeeEditForm.phone ||
      selectedSkill.length === 0
      // active === false
    ) {
      setSuccess(false);
      setMessage('Please fill all the fields!');
      setTimeout(() => {
        setMessage('');
      }, 1500);
    } else {
      let formData = {
        employeename: employeeEditForm.employeename,
        email: employeeEditForm.email,
        phone: employeeEditForm.phone,
        technology: selectedSkill,
        active: active,
      };
      console.log('formData->', formData);

      axios
        .put(`${rootApi}/employees/${empId}`, formData)
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setSuccess(true);
            setMessage('Form edited success!');

            setTimeout(() => {
              setActivechange(false);
              navigate('/');
            }, 1000);

            setTimeout(() => {
              setMessage('');
            }, 1500);
          } else {
            setSuccess(false);
            setMessage('Form edited failed! Something error');
            setTimeout(() => {
              setMessage('');
            }, 1500);
          }
        })
        .catch((err) => console.log('submit-err', err));
    }
  };

  const techOptions = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'node', label: 'Node' },
  ];

  const handleChange = (newSkill, actionMeta) => {
    console.log('newSkill->', newSkill);

    // to update data
    setSelectedSkill(newSkill);
  };

  console.log('selectedSkill-->', selectedSkill);
  return (
    <div className="container">
      {' '}
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: 'left' }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={employeeEditForm.id}
                        disabled="disabled"
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        name="employeename"
                        id="employeename"
                        value={employeeEditForm.employeename}
                        onChange={(e) => onTextFieldChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        name="email"
                        id="email"
                        value={employeeEditForm.email}
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
                        value={employeeEditForm.phone}
                        onChange={(e) => onTextFieldChange(e)}
                        className="form-control"
                      ></input>
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
                        value={selectedSkill}
                        onChange={(option) => handleChange(option)}
                        components={animatedComponents}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => setActivechange(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label className="form-check-label">
                        {' '}
                        {active === false ? 'Inactive' : 'Active'} Employee
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>{' '}
                      &nbsp;
                      <Link to="/" className="btn btn-secondary">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
