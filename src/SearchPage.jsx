import { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-4">Qualiftify</h1>
      <input
        type="text"
        id="search"
        placeholder="Search Artists Here"
        className="py-2 px-4 text-center text-lg mb-2"
        style={{ width: "80%" }}
        value={search}
        onChange={e => setSearch(e.target.value)} />

      <Link
        to={`/list/${search}`}
        className="py-2 px-4 text-center text-lg bg-gray-200 hover:bg-gray-300 mb-2"
        style={{ width: "80%" }}>
          Search
      </Link>
      <Link
        to={`/favorite`}
        className="py-2 px-4 text-center text-lg border-4 border-gray-200 hover:border-gray-300"
        style={{ width: "80%" }}>
          View Favorites
      </Link>
    </div>
  );
}

export default SearchPage;