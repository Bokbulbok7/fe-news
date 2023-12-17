const Error = ({ status, msg }) => {
  return (
    <div id="error">
      <h2>Error Occurred</h2>
      <p>Message: {msg}</p>
      <p> {msg} </p>
    </div>
  );
};

export default Error;
