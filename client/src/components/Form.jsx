import { useState } from 'react';

function Form({ submitNewLink }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleURLChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !url.trim()) return;

    submitNewLink({ name, url });

    setName('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="linkName" className="form-label">
          Link Name
        </label>
        <input
          type="text"
          id="linkName"
          name="linkName"
          className="form-control"
          value={name}
          onChange={handleNameChange}
          placeholder="e.g. Google"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="linkURL" className="form-label">
          Link URL
        </label>
        <input
          type="text"
          id="linkURL"
          name="linkURL"
          className="form-control"
          value={url}
          onChange={handleURLChange}
          placeholder="e.g. https://google.com"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  );
}

export default Form;
