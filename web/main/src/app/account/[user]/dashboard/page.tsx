'use client';
import { PageLayout } from 'shared.ui/components/page/exports';
import { TasksBoard } from './components/exports';
import { useState } from 'react';

export default function Dashboard() {
  return (
    <PageLayout mainContainerClass='px-page-sm'>
      <TasksBoard />
    </PageLayout>
  );
}
