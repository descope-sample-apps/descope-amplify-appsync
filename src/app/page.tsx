"use client"
import { generateClient } from 'aws-amplify/api';
import { listTodos } from '../graphql/queries';
import { Amplify } from 'aws-amplify';
import config from '../amplifyconfiguration.json';
import { useSession } from '@descope/react-sdk'
import { getSessionToken } from '@descope/react-sdk';
import { useState } from "react";
import Login from "./components/Login";

Amplify.configure(config)
const client = generateClient();

const fetchData = async () => {
  const sessionToken = getSessionToken();
  console.log(sessionToken)
  const todos = await client.graphql({ query: listTodos, authToken: sessionToken });
  console.log(todos)
  return todos;
}

export default function Home() {
  const { isAuthenticated } = useSession();
  const [apiResponse, setApiResponse] = useState(null);

  const handleApiRequest = async () => {
    try {
      const response = await fetchData();
      setApiResponse(response as any);
    } catch (error) {
      console.error('Error making API request:', error);
      setApiResponse(null);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px'
  };

  const dataContainerStyle = {
    marginTop: '20px',
    backgroundColor: '#f4f4f4',
    border: '1px solid #ddd',
    padding: '10px',
    width: '80%',
    maxHeight: '300px',
    overflowY: 'auto'
  };

  return (
    <div style={containerStyle as any}>
      {isAuthenticated ? (
        <div>
          <h1>Hello!</h1>
          <button style={buttonStyle} onClick={handleApiRequest}>Fetch Data</button>
          {apiResponse && (
            <div style={dataContainerStyle as any}>
              <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
