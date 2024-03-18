import { useEffect, useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import { useMutation } from '@tanstack/react-query';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate, useLocation } from 'react-router-dom';

import { login } from '../../api/serverApi';

import './mdb.min.css';
import './custom.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [checkErrors, setCheckErrors] = useState(false);
  const [rememberCheckbox, setRememberCheckbox] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const signIn = useSignIn();

  useEffect(() => {
    setCheckErrors(false);
  }, [identifier, password]);

  const redirectPath = location.state?.path || '/';

  const handleCheckboxChange = () => {
    setRememberCheckbox((prev) => !prev);
  };

  const loginMutation = useMutation((credentials) => login(credentials), {
    onSuccess: (data) => {
      const { data: signinData } = data;
      // if (data.data?.error) {
      //   return toast.error(data.data?.error || 'Սխալ է տեղի ունեցել', {
      //     progress: undefined,
      //   });
      // }
      setIdentifier('');
      setPassword('');
      signIn({
        token: signinData.jwt,
        expiresIn: 30 * 24 * 60,
        tokenType: 'Bearer',
        authState: signinData.user,
      });
      return navigate(redirectPath, { replace: true });
    },
    onError: (error, variables, context, mutation) => {
      console.log('err:::::: >>>>>', error);

      // toast.error(error.response?.data?.error?.message || error.message, {
      //   progress: undefined,
      // });
    },
  });

  const handleSubmit = async (e) => {
    setCheckErrors(true);
    e.preventDefault();
    loginMutation.mutate({ identifier, password });
  };
  const { isLoading, error, isError } = loginMutation;

  const validClassName =
    checkErrors && isError && error?.response.status === 400
      ? 'is-invalid'
      : '';
  const emailInputCn = `form-control form-control-lg ${validClassName}`;
  return (
    <>
      {isLoading && <LinearProgress color="secondary" />}
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="form1Example23"
                    className={`${emailInputCn}`}
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                  <div className="invalid-feedback">
                    Մուտքանունը կամ գաղտնաբառը սխալ են:
                  </div>
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                      checked={rememberCheckbox}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {' '}
                      Remember me{' '}
                    </label>
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <a
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: '#3b5998' }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f me-2"></i>Continue with
                  Facebook
                </a>
                <a
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: '#55acee' }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter me-2"></i>Continue with Twitter
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
