import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOptions from './AppointmentOptions';

const AvailableAppointment = ({ selectedDate }) => {
    
    const [treatment, setTreatment] = useState(null);
    const { data: appointmentOption = [], } = useQuery({
      queryKey: ["appointmentOptions"],
      queryFn: async () => {
        const res = await fetch("http://localhost:5000/appointmentOptions");
        const data = await res.json();
        return data;
      },
    });
    
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