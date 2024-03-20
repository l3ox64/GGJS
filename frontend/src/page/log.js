import React, { useState, useEffect } from 'react';
import { isAuthCookie, getAuthDataFromCookie } from '../components/Cookie';

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
        <label htmlFor="user-select">Choose user:</label>
        <select id="user-select" value={selectedUser} onChange={handleUserSelect}>
          <option value="">Choose a user</option>
          {users.map(user => (
            <option key={user.Email_utente} value={user.Email_utente}>{user.Nome_utente} {user.Cognome_utente}</option>
          ))}
        </select>
        <button onClick={handleViewLogs}>View Logs</button>
      </div>
      <div>
        <h2>User Logs</h2>
        <table style={{ borderSpacing: '0 10px' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px' }}>Date</th>
              <th style={{ padding: '10px' }}>IP</th>
              <th style={{ padding: '10px' }}>Operation</th>
              <th style={{ padding: '10px' }}>HTTP Status</th>
              <th style={{ padding: '10px' }}>Log Level</th>
              <th style={{ padding: '10px' }}>Request Type</th>
              <th style={{ padding: '10px' }}>Modified Fields</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                <td style={{ padding: '10px' }}>{log.date}</td>
                <td style={{ padding: '10px' }}>{log.ip=="::1"?"(localhost) richiesta da react all api" : log.ip}</td>
                <td style={{ padding: '10px' }}>{log.operation}</td>
                <td style={{ padding: '10px' }}>{log.httpStatus}</td>
                <td style={{ padding: '10px' }}>{log.logLevel}</td>
                <td style={{ padding: '10px' }}>{log.requestType}</td>
                <td style={{ padding: '10px' }}>{log.modifiedFields ? log.modifiedFields.join(', ') : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLogPage;
