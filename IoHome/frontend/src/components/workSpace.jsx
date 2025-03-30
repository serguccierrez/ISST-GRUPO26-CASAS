import React, { useEffect, useState } from 'react';

const WorkspaceInfo = () => {
  const [workspace, setWorkspace] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/seam/devices')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener el workspace');
        }
        return response.json();
      })
      .then(data => {
        setWorkspace(data);
      })
      .catch(err => {
        setError('Error: ' + err.message);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!workspace) {
    return <div>Cargando workspace...</div>;
  }

  return (
    <div>
      <h1>Información del Workspace</h1>
      <p>ID: {workspace.workspace_id}</p>
      <p>Nombre: {workspace.name}</p>
    </div>
  );
};

export default WorkspaceInfo;
