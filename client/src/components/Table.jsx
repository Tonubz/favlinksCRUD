function TableHeader() {
  return (
    <thead className="table-dark">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">URL</th>
        <th scope="col" className="text-center">
          Remove
        </th>
      </tr>
    </thead>
  );
}

const TableBody = ({ linkData, removeLink }) => {
  const rows = linkData.map((row, index) => {
    const url = row.url || row.URL;
    const key = row.id ?? index;

    return (
      <tr key={key}>
        <td>{row.name}</td>
        <td>
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </td>
        <td className="text-center">
          <button
            className="btn btn-sm btn-danger"
            onClick={() => removeLink(row.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

function Table({ linkData, removeLink }) {
  const handleRemove = (id) => {
    removeLink(id);
  };

  return (
    <div className="table-responsive mt-3">
      <table className="table table-striped table-hover align-middle">
        <TableHeader />
        <TableBody linkData={linkData} removeLink={handleRemove} />
      </table>
      {linkData.length === 0 && (
        <p className="text-muted text-center mb-0">No links yet. Add one below!</p>
      )}
    </div>
  );
}

export default Table;
