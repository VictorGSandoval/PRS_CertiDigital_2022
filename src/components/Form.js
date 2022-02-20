export const Form = ({ children, title }) => {
  return (
    <div className="col-5">
      <div className="card p-3">
        <h3 className="card-title">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Form;
