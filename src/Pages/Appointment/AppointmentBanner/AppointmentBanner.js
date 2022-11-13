import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import chair from '../../../assets/images/chair.png';
const AppointmentBanner = ({ setSelectedDate , selectedDate}) => {
  return (
    <div>
      <div className="hero my-20">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt="" />
          <div className="mr-6">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
            <p>
              Your Selected DAte is:{" "}
              {selectedDate ? format(selectedDate, "PP") : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;