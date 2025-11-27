// server/queries.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'tony',
  host: 'localhost',
  database: 'favlinks',
  password: 'password',
  port: 5432,
});

// READ – get all links
const getLinks = (request, response) => {
  pool.query('SELECT id, name, url FROM links ORDER BY id ASC', (error, results) => {
    if (error) {
      console.error('Error fetching links:', error);
      return response.status(500).json({ error: 'Database error' });
    }
    response.status(200).json(results.rows);
  });
};

// CREATE – add a new link
const createLink = (request, response) => {
  const { name, URL } = request.body; // frontend sends { name, URL }

  if (!name || !URL) {
    return response.status(400).json({ error: 'Name and URL are required' });
  }

  pool.query(
    'INSERT INTO links (name, url) VALUES ($1, $2) RETURNING id, name, url',
    [name, URL],
    (error, results) => {
      if (error) {
        console.error('Error creating link:', error);
        return response.status(500).json({ error: 'Database error' });
      }

      const link = results.rows[0];
      response.status(201).json({
        message: 'Link added',
        link,
      });
    }
  );
};

// UPDATE – edit existing link
const updateLink = (request, response) => {
  const id = parseInt(request.params.id, 10);
  const { name, URL } = request.body;

  if (!name || !URL) {
    return response.status(400).json({ error: 'Name and URL are required' });
  }

  pool.query(
    'UPDATE links SET name = $1, url = $2 WHERE id = $3 RETURNING id, name, url',
    [name, URL, id],
    (error, results) => {
      if (error) {
        console.error('Error updating link:', error);
        return response.status(500).json({ error: 'Database error' });
      }

      if (results.rowCount === 0) {
        return response.status(404).json({ error: 'Link not found' });
      }

      response.status(200).json({
        message: 'Link updated',
        link: results.rows[0],
      });
    }
  );
};

// DELETE – remove a link
const deleteLink = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('DELETE FROM links WHERE id = $1 RETURNING id', [id], (error, results) => {
    if (error) {
      console.error('Error deleting link:', error);
      return response.status(500).json({ error: 'Database error' });
    }

    if (results.rowCount === 0) {
      return response.status(404).json({ error: 'Link not found' });
    }

    response.status(200).json({ message: 'Link deleted', id });
  });
};

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
};
