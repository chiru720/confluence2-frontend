# Generated API Client

This directory contains the auto-generated TypeScript API client based on the OpenAPI specification from the backend.

## Important

**DO NOT EDIT FILES IN THIS DIRECTORY DIRECTLY**

All files in this directory are automatically generated from the OpenAPI specification located at `api-docs/openapi.json`. Any manual changes will be overwritten when the API client is regenerated.

## How to Update

When the backend API changes:

1. Get the updated OpenAPI specification:
   ```bash
   # From the backend directory
   cd ../conf-2-backend
   yarn openapi:update-frontend
   ```
   
   This updates the `api-docs/openapi.json` file in the frontend project.

2. Regenerate the API client:
   ```bash
   yarn api:generate
   ```

## How to Use

Import and use the generated API client in your components or services:

```tsx
// Example usage with a specific API
import { UsersApi, Configuration } from '../api';
import { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const apiConfig = new Configuration({
      basePath: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api/v1',
    });
    
    const usersApi = new UsersApi(apiConfig);
    usersApi.getUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
```

## API Structure

The generated API client includes:

- Type definitions for all request and response objects
- API classes for each endpoint group
- Configuration options for authentication and baseUrl
- Helper utilities for working with the API 