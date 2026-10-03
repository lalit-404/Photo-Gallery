import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=12`,
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to load images");
    } finally {
      setLoading(false); // runs on success or failure
    }
  };

  // Pagination logic
  const previousPage = () => {
    index > 1 && setIndex((prev) => prev - 1);
  };

  const nextPage = () => {
    setIndex((prev) => prev + 1);
  };

  useEffect(() => {
    getData();
  }, [index]);

  if (error)
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <p className="text-lg font-semibold text-zinc-900">{error}</p>
          <p className="mt-1 text-sm text-zinc-500">
            Check your connection and try again.
          </p>
          <button
            onClick={getData}
            className="mt-5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Classic Photo gallery
          </h1>
          <p className="mt-2 text-zinc-500">
            Click a photo to view it on Picsum.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] rounded-xl bg-zinc-200" />
                  <div className="mt-2 h-3 w-2/3 rounded bg-zinc-200" />
                </div>
              ))
            : data.map((elem) => (
                <a
                  key={elem.id}
                  href={elem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-xl bg-zinc-200">
                    <img
                      src={elem.download_url}
                      alt={`Photo by ${elem.author}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 truncate text-sm font-medium text-zinc-700 group-hover:text-zinc-900">
                    {elem.author}
                  </p>
                </a>
              ))}
        </div>

        <nav
          aria-label="Pagination"
          className="mt-10 flex items-center justify-center gap-4"
        >
          <button
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
            onClick={previousPage}
            disabled={index === 1}
          >
            Previous
          </button>
          <p className="text-sm text-zinc-500">Page {index}</p>
          <button
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-zinc-900 cursor-pointer"
            onClick={nextPage}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default App;
