
import React from 'react';
import { useParams } from 'react-router-dom';

const PracticalCourse = () => {
  const { id, moduleId } = useParams();
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Practical Course</h1>
      <p className="text-muted-foreground">
        Coming soon: Course {id}, Module {moduleId}
      </p>
    </div>
  );
};

export default PracticalCourse;
