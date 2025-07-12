const Notification = ({ message }) => {
  if (!message.text) return null;

  if (message.type === 'success') {
    return <div className="success">{message.text}</div>;
  }
  return <div className="error">{message.text}</div>;
};

export default Notification;
