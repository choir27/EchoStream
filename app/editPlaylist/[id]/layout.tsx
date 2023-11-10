export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main lang="en">
        {children}
      </main>
    )
  }