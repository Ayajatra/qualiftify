import { useEffect, useState } from "react";

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    const _favorites = Object.entries(localStorage).map(([id, name]) => {
      return {
        id,
        name
      };
    });

    setFavorites(_favorites);
  }

  function removeFavorite(id) {
    localStorage.removeItem(id);
    loadFavorites();
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gray-100 p-2 gap-2">
      <h1 className="text-4xl font-light mb-2">Favorites</h1>
      {favorites.map(favorite =>
        <div key={favorite.id} className="flex items-center bg-gray-200 p-3" style={{width: "80%"}}>
          <p className="mr-auto truncate">{favorite.name}</p>
          <button onClick={() => removeFavorite(favorite.id)} className="text-xl">
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default FavoritePage;