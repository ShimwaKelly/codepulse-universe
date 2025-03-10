
import React from 'react';
import { useParams } from 'react-router-dom';

const FinalExam = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Final Exam</h1>
      <p className="text-muted-foreground">
        Coming soon: Final exam for course {id}
      </p>
    </div>
  );
};

export default FinalExam;
