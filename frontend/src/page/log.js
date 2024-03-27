import React, { useState, useEffect } from 'react';
import { isAuthCookie, getAuthDataFromCookie } from '../components/Cookie';
import { Table, Button, Form } from 'react-bootstrap';

const AdminLogPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user list');
      }
      const userList = await response.json();
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/logs/user/${selectedUser}`);
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }
      const userLogs = await response.json();
      setLogs(userLogs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleUserSelect = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleViewLogs = () => {
    fetchLogs();
  };

  if (!isAuthCookie() || !getAuthDataFromCookie().isAdmin) {
    window.location.assign('/main');
    return null;
  }

  return (
    <div>
      <h1>Admin Log Page</h1>
      <div>
        <Form.Group controlId="user-select">
          <Form.Label>Choose user:</Form.Label>
          <Form.Control as="select" value={selectedUser} onChange={handleUserSelect}>
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.Email_utente} value={user.Email_utente}>{user.Nome_utente} {user.Cognome_utente}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button onClick={handleViewLogs}>View Logs</Button>
      </div>
      <div>
        <h2>User Logs</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Operation</th>
              <th>HTTP Status</th>
              <th>Log Level</th>
              <th>Request Type</th>
              <th>Modified Fields</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.date}</td>
                <td>{log.operation}</td>
                <td>{log.httpStatus}</td>
                <td>{log.logLevel}</td>
                <td>{log.requestType}</td>
                <td>{log.modifiedFields ? log.modifiedFields.join(', ') : ""}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminLogPage;
