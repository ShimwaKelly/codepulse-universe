
import React from 'react';
import { useParams } from 'react-router-dom';

const SingleCourse = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Course Details</h1>
      <p className="text-muted-foreground">
        Coming soon: Detailed view of course {id}
      </p>
    </div>
  );
};

export default SingleCourse;
