const Card = ({ elem }) => {
  return (
    <>
      <a
        // key={elem.id}
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
    </>
  );
};

export default Card;
