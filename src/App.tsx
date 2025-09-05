function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="fixed top-0 left-0 right-0 h-16 bg-blue-600 text-white flex items-center px-4 shadow z-10">
          <h1 className="text-xl font-bold">Header</h1>
        </header>

        <main className="pt-16 flex-1 flex flex-col">
          <div className="flex-1 bg-gray-100 p-4">
            <p>
              Content area. If there’s not enough text, the footer still sticks to the bottom of the
              viewport.
            </p>
            <div className="space-y-4 mt-4">
              <p>More content…</p>
              <p>More content…</p>
              <p>More content…</p>
              <p>More content…</p>
              <p>More hello</p>
            </div>
          </div>

          <footer className="bg-gray-800 text-white p-4">
            <p>Footer © 2025</p>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
