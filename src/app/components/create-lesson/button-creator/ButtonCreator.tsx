"use client";

import React, { useState } from "react";

interface DynamicComponentProps {
  element: JSX.Element;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({ element }) => {
  return <div>{element}</div>;
};

interface ButtonCreatorProps {
  component: JSX.Element;
}

const ButtonCreator: React.FC<ButtonCreatorProps> = ({ component }) => {
  const [components, setComponents] = useState<JSX.Element[]>([]);

  const handleClick = () => {
    // Crea un nuevo componente y lo agrega a la lista de componentes
    const newComponent = <DynamicComponent key={components.length} element={component} />;
    setComponents([...components, newComponent]);
  };

  return (
    <div>
      <button onClick={handleClick}>+</button>
      <div>
        {components.map((component, index) => (
          <div key={index}>{component}</div>
        ))}
      </div>
    </div>
  );
};

export default ButtonCreator;
