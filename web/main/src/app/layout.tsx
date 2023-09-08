import 'shared.ui/css/global.css';
import { Metadata } from 'next';
import { sharedMetaOptions, SharedMeta } from 'shared.ui/meta/exports';

export const metadata: Metadata = {
  ...sharedMetaOptions,
  title: 'Monorepo Template',
  description: 'Main site for Monorepo Template',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <SharedMeta />
      </head>
      <body>{children}</body>
    </html>
  );
}
