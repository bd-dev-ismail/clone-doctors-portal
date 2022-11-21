import React from 'react';

const ConfrimationModal = ({
  closeModal,
  deleting,
  modalTitle,
  handalDelete,
}) => {
  return (
    <div>
      <input type="checkbox" id="confrimationModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalTitle}</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label onClick={()=> handalDelete(deleting)} htmlFor="confrimationModal" className="btn">
              Delete
            </label>
            <label
              onClick={closeModal}
              htmlFor="confrimationModal"
              className="btn"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfrimationModal;