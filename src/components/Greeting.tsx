
import React from 'react';

interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="py-6 px-5">
      <h2 className="text-4xl font-bold text-finaura-accent">
        {getGreeting()},
      </h2>
      <h2 className="text-4xl font-bold text-finaura-accent mt-2">
        {name}
      </h2>
    </div>
  );
};

export default Greeting;
