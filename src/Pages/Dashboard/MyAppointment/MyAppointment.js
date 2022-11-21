import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const MyAppointment = () => {
    const {user} = useContext(AuthContext);
    const {data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async()=> {
            const res = await fetch(
              `http://localhost:5000/bookings?email=${user?.email}`,
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem(
                    "access-token"
                  )}`,
                },
              }
            );
            const data = await res.json();
            return data;
        }
    })
    return (
      <div>
        <h3 className="text-3xl mb-6">My Appointment</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={booking._id}>
                  <th>{idx + 1}</th>
                  <td>{booking?.patient}</td>
                  <td>{booking?.treatment}</td>
                  <td>{booking?.appointmentDate}</td>
                  <td>{booking?.slot}</td>
                  <td>
                    {booking?.price && !booking?.paid && (
                      <Link to={`/dashboard/payment/${booking._id}`}>
                        <button className="btn btn-sm btn-primary">Pay</button>
                      </Link>
                    )}
                    {booking?.price && booking.paid && (
                      <span className="text-primary">Paid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MyAppointment;