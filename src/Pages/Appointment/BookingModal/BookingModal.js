import { format } from "date-fns/esm";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
  const { name, slots } = treatment; //treatmemtn = appointmentOption
  const date = format(selectedDate, "PP");
  const { user } = useContext(AuthContext);
  const handalBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const slot = form.slot.value;
    // console.log(name, email, phone, slot, date);
    const booking = {
      appointmentDate: date,
      patient: name,
      treatment: treatment?.name,
      email,
      phone,
      slot,
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setTreatment(null);
          toast.success("Booking Confrimed");
          refetch();
        }
        else{
          toast.error(data.message)
        }
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            onSubmit={handalBooking}
            className="mt-10 grid grid-cols-1 gap-4"
          >
            <input
              type="text"
              disabled
              value={date}
              className="input input-bordered w-full"
            />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              defaultValue={user?.displayName}
              disabled
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              defaultValue={user?.email}
              disabled
              type="email"
              name="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
            <input
              required
              type="text"
              name="phone"
              placeholder="Your Phone"
              className="input input-bordered w-full"
            />
            <br />
            <input
              type="submit"
              value="Submit"
              className="btn btn-accent w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
