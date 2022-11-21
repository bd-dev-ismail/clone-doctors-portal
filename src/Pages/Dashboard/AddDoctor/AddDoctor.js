import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();
    const {data: specialities = [], } = useQuery({
        queryKey: ['speciality'],
        queryFn: async()=> {
            const res = await fetch(
              "http://localhost:5000/appointmentSpeciality"
            );
            const data = await res.json();
            return data;
        }
    });
    const handalAddDoctor = (data)=> {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=6398a21721a1aff038d06b0f7b38db50`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.data.display_url);
            const doctor = {
            //   name: data.name,
            //   email: data.email,
            //   speciality: data.speciality,
              image: data.data.display_url,
            };
            fetch("http://localhost:5000/doctors", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(doctor)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.acknowledged){
                    toast.success('Doctor added successfully');
                    navigate("/dashboard/displaydoctor");
                }
            })
        })
    }
    return (
      <div className="w-96">
        <h3 className="text-3xl mb-6">Add Doctor</h3>
        <form onSubmit={handleSubmit(handalAddDoctor)}>
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
              <span className="label-text">Speciality</span>
            </label>
            <select
              {...register("speciality")}
              className="select select-bordered w-full"
            >
              {specialities?.map((speciality) => (
                <option key={speciality._id} value={speciality?.name}>
                  {speciality.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text">Upload Image</span>
            </label>
            <input
              {...register("image")}
              type="file"
              name="image"
              id=""
              className="input input-bordered w-full"
            />
          </div>

          <input
            type="submit"
            className="btn btn-accent w-full my-8"
            value="Add Doctor"
          />
         
        </form>
      </div>
    );
};

export default AddDoctor;