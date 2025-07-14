const EmailConfirmModal = () => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Check Your Email</h3>
        <p>
          We've sent you a confirmation link. Please check your email and verify
          your address to proceed.
        </p>
        {/* <button onClick={onClose}>Okay</button> */}
      </div>
    </div>
  );
};

export default EmailConfirmModal;
