import React, { FC } from 'react';
import { Table } from 'UI';

const HomePage: FC = () => {
  return (
    <div>
      <div>home</div>
      <Table onCeilClick={(val) => console.log(val)} />
    </div>
  );
};

export default HomePage;
