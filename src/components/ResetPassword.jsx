import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authServices from '../services/authServices';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [token, setToken] = useState('');
  const [expires, setExpires] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract token from the URL query params
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');
    console.log(queryParams)
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }

  }, [location.search]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.newPassword) newErrors.newPassword = 'New password is required.';
    else if (formData.newPassword.length < 6) newErrors.newPassword = 'New password must be at least 6 characters long.';
    if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors
    setErrors({});

    try {
      await authServices.resetPassword(token, formData.newPassword);
      navigate('/login');
    } catch (error) {
      setErrors({ global: 'Failed to reset password. Please try again.' });
    }
  };

  return (
    <div className="form-container container">
      <div className="row">
        <div className="col-md-8 col-lg-6 mx-auto">
          <div className="card shadow-lg rounded-3 p-3 mt-3">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">Reset Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter your new password"
                  />
                  {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
                {errors.global && <div className="alert alert-danger">{errors.global}</div>}
                <button type="submit" className="btn btn-primary w-100">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
