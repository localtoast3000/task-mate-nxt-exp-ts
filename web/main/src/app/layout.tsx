import 'shared.ui/css/global.css';
import { Metadata } from 'next';
import { sharedMetaOptions, SharedMeta } from 'shared.ui/meta/exports';
import { TasksContextProvider } from '@/context/tasks';

export const metadata: Metadata = {
  ...sharedMetaOptions,
  title: 'Task Mate',
  description: 'Main site for Task Mate',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <SharedMeta />
      </head>
      <TasksContextProvider>
        <body>{children}</body>
      </TasksContextProvider>
    </html>
  );
}
