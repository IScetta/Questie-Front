"use client"


import React, { useState } from 'react';



const ButtonCreator = ({component}:any) => {
  const [components, setComponents] = useState([]);

const DynamicComponent = ({element}:any) => {
  return <div>{element}</div>;
};
  const handleClick = () => {
    // Crea un nuevo componente y lo agrega a la lista de componentes
    const newComponent = <DynamicComponent key={components.length} element={component} />;
    setComponents([...components, newComponent]);
  };

  return (
    <div>
      <button  className='border-2 border-red-900 p-2 m-5' onClick={handleClick}>Crear Componente</button>
      <div>
        {/* Muestra todos los componentes creados */}
        {components.map((component, index) => (
          <div key={index}>{component}</div>
        ))}
      </div>
    </div>
    
  );
};

export default ButtonCreator;
