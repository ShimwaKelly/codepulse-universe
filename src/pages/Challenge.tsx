
import React from 'react';
import { useParams } from 'react-router-dom';

const Challenge = () => {
  const { id, challengeId } = useParams();
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Code Challenge</h1>
      <p className="text-muted-foreground">
        Coming soon: Challenge {challengeId} for course {id}
      </p>
    </div>
  );
};

export default Challenge;
