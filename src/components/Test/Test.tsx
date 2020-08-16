import React from 'react';

interface TestProps {
  text: string;
}

const Test = ({ text }: TestProps) => {
  return <p>{text}</p>;
};

export default Test;
