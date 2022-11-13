import React from 'react';

const AppointmentOptions = ({ appoitnmentOption, setTreatment }) => {
  const { name, slots } = appoitnmentOption;
  return (
    <div className="card  bg-base-100 shadow-xl">
      <div className="card-body text-center">
        <h2 className="text-xl font-bold text-center text-secondary">{name}</h2>
        <p>{slots.length > 0 ? slots[0] : "Try Another Day!"}</p>
        <p>
          {slots.length} {slots.length === 0 ? "Space" : "Spaces"} Available
        </p>
        <div className="card-actions justify-center">
          <label
            onClick={() => setTreatment(appoitnmentOption)}
            htmlFor="booking-modal"
            className="btn btn-primary text-white"
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOptions;