
const Table = ({children, title}) => {
  return (
    <div className="col-7">
      <div className="card p-3">
        <h3 className="card-title">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Table;
