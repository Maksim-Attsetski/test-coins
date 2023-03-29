import React, { memo, useState } from 'react';

import { Outlet } from 'react-router-dom';

import Header from '../Header';
import s from './Layout.module.scss';

const _Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={s.rootLayout}>
      <div>
        <Header isOpen={collapsed} setIsOpen={setCollapsed} />
        <main className={`${s.content}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default memo(_Layout);
