'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import type { AppStore } from './index';
import { makeStore } from './index';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
