import React, { useContext, useState} from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/userToken';


const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {loginUser} = useContext(AuthContext);
    const [loginEmail, setLoginEmail] = useState('');
    const navigate = useNavigate();
    // const [token] = useToken(loginEmail);
    // if(token) {
    //   navigate('/')
    // }
    const handelLogin = (data )=> {
        console.log(data);
        
        loginUser(data.email, data.password)
        .then(result => {
          const user = result.user;
          console.log(user);
          navigate('/')
        //  setLoginEmail(data.email);
        })
        .catch(er=> console.log(er))
    }
    // const getUserToken = (email) => {
    //   fetch(`http://localhost:5000/jwt?email=${email}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       if (data.accessToken) {
    //         localStorage.setItem("access-token", data.accessToken);
    //         navigate("/");
    //       }
    //     });
    // };
    return (
      <div className="flex h-[750px]   justify-center items-center text-center">
        <div className="w-96 shadow-2xl px-4 py-10">
          <h3 className="text-xl font-semibold mb-6">Login</h3>
          <form onSubmit={handleSubmit(handelLogin)}>
            <div className="form-control w-full max-w-sm">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Email Address is Required",
                })}
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-sm"
              />
              {errors.email && (
                <p className="text-error text-start my-2">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full max-w-sm">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register(
                  "password",
                 
                  {
                    required: true,
                    minLength: {
                      value: 6,
                      message: "Password should be 6 Characters or Long",
                    },
                    pattern: {
                         
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                      message: "Password must be Number , Uppercase & Special Character"
                
                    }
                  }
                )}
                type="password"
                placeholder="Enter Your Password"
                className="input input-bordered w-full max-w-sm"
              />
              <label className="label">
                <span className="label-text">Forget Password ?</span>
              </label>
              {errors?.password && (
                <p className="text-error text-start my-2">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <input
              type="submit"
              className="btn btn-accent w-full my-8"
              value="Login"
            />
            <p>
              New to Doctors Portal ?{" "}
              <Link className="text-secondary" to="/signup">
                Create new account
              </Link>
            </p>
          </form>
          <div className="divider">OR</div>
          <button className="btn btn-outline w-full">
            Continue with Google
          </button>
        </div>
      </div>
    );
};

export default Login;