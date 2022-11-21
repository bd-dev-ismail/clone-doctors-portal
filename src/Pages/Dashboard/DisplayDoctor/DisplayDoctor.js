import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfrimationModal from '../../Shared/ConfrimationModal/ConfrimationModal';
import Loading from '../../Shared/Loading/Loading';

const DisplayDoctor = () => {
    const [deleting, setDeleting] = useState(null);
    const closeModal = ()=> {
        setDeleting(null)
    }
    
    const { data: doctors = [], isLoading, refetch} = useQuery({
        queryKey: ['doctors'],
        queryFn: async()=> {
            const res = await fetch("http://localhost:5000/doctors");
            const data = await res.json();
            return data;
        }
        
    })
    const handalDelete = (doctor) => {
      fetch(`http://localhost:5000/doctors/${doctor._id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0){
            refetch();
            toast.success('Delete successfully')
          } 
        });
    };
    if(isLoading){
      return <Loading/>
    }
    return (
      <div>
        <h3 className="text-3xl mb-6">All Doctors</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors?.map((doctor, idx) => (
                <tr key={doctor._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded">
                        <img src={doctor.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{doctor._id}</td>
                  <td>
                    <label
                      onClick={() => setDeleting(doctor)}
                      htmlFor="confrimationModal"
                      className="btn btn-sm text-white btn-error"
                    >
                      Delete
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {deleting && (
          <ConfrimationModal
            closeModal={closeModal}
            modalTitle={`Are Your sure you want to Delete ${deleting.name}`}
            deleting={deleting}
            handalDelete={handalDelete}
          ></ConfrimationModal>
        )}
      </div>
    );
};

export default DisplayDoctor;