import React, { useState } from 'react';
import axios from 'axios';
function SandboxForm({ token }) {
  const [code, setCode] = useState('');
  const [executionResult, setExecutionResult] = useState('');

  const executeCode = async () => {
    try {
      await axios.post(
        `https://ecom-backend-t7c9.onrender.com/sandbox`,
        { code },
        { headers: { Authorization: token } }
      );
      setExecutionResult('Code executed successfully');
    } catch (error) {
      console.error('Error executing code', error);
      setExecutionResult('Error executing code');
    }
  };

  return (
    <div>
      <h2>JavaScript Sandbox</h2>
      <textarea
        placeholder="Enter your JavaScript code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <button onClick={executeCode}>Execute Code</button>
      {executionResult && <p>{executionResult}</p>}
    </div>
  );
}

export default SandboxForm;