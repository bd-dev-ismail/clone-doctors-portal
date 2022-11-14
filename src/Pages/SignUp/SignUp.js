import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../context/AuthProvider';
const SignUp = () => {
    const {register, handleSubmit , formState: {errors}} = useForm();
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handelSignUp = (data) => {
        console.log(data);
        createUser(data.email,data.password)
        .then(result=> {
          const user = result.user;
          console.log(user);
          navigate("/");
        })
        .catch(err=> console.log(err))
    }
    return (
      <div className="flex h-[750px]   justify-center items-center text-center">
        <div className="w-96 shadow-2xl px-4 py-10">
          <h3 className="text-xl font-semibold mb-6">Signup</h3>
          <form onSubmit={handleSubmit(handelSignUp)}>
            <div className="form-control w-full max-w-sm">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                {...register("name", { required: "Name Field is Required" })}
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full max-w-sm"
              />
              {errors.name && (
                <p className="text-error text-start my-2">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full max-w-sm">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: "Email Field is Required" })}
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
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "password should be 6 charaters or Long",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                    message:
                      "Password must be Number , Uppercase & Special Character",
                  },
                })}
                type="password"
                placeholder="Enter Your Password"
                className="input input-bordered w-full max-w-sm"
              />
              {errors.password && (
                <p className="text-error text-start my-2">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <input
              type="submit"
              className="btn btn-accent w-full my-8"
              value="Signup"
            />
            <p>
              Already have an account ?{" "}
              <Link className="text-secondary" to="/login">
                Please Login
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

export default SignUp;