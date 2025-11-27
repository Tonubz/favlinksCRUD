import { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

const LinkContainer = () => {
  const [favLinks, setFavLinks] = useState([]);

  // GET /links
  const fetchLinks = async () => {
    try {
      const response = await fetch('/links');
      const data = await response.json();
      setFavLinks(data); // [{ id, name, url }, ...]
    } catch (error) {
      console.log('Error fetching links:', error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // POST /new
  const postLink = async (favLink) => {
    const payload = {
      name: favLink.name,
      URL: favLink.url, // backend expects "URL"
    };

    try {
      const response = await fetch('/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.log('Error posting link:', response.statusText);
      }

      // reload full list from DB
      await fetchLinks();
    } catch (error) {
      console.log('Error posting link:', error);
    }
  };

  const handleSubmit = async (favLink) => {
    await postLink(favLink);
  };

  // DELETE /links/:id
  const handleRemove = async (id) => {
    try {
      const response = await fetch(`/links/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.log('Error deleting link:', response.statusText);
      }

      // update state locally
      setFavLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (error) {
      console.log('Error deleting link:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center mb-3">My Favorite Links</h1>
          <p className="text-center text-muted">
            Add a new URL with a name and link to the table.
          </p>

          <Table linkData={favLinks} removeLink={handleRemove} />

          <hr className="my-4" />

          <h3 className="mb-3">Add New</h3>
          <Form submitNewLink={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default LinkContainer;
