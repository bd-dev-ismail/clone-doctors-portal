import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOptions from './AppointmentOptions';

const AvailableAppointment = ({ selectedDate }) => {
    const [appointmentOption, setAppointmentOption] = useState([]);
    const [treatment, setTreatment] = useState(null);
    useEffect(()=> {
        fetch("appointmentOptions.json")
        .then(res => res.json())
        .then(data => setAppointmentOption(data))
    },[])
  return (
    <div>
      <div>
        <p className="text-xl font-bold text-secondary text-center">
          Available Appointments on{" "}
          {selectedDate ? format(selectedDate, "PP") : ""}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointmentOption.map((option) => (
          <AppointmentOptions
            key={option._id}
            appoitnmentOption={option}
            setTreatment={setTreatment}
          ></AppointmentOptions>
        ))}
      </div>
      {treatment && (
        <BookingModal
          treatment={treatment}
          setTreatment={setTreatment}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default AvailableAppointment;