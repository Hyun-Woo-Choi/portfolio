import './globals.css';

export const metadata = {
  title: 'Career Outcomes Portfolio',
  description: 'A concise and credible portfolio of career outcomes and project results.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
