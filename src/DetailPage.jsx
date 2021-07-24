import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function DetailPage() {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [isInFavorites, setIsInFavorite] = useState(false);

  function addToFavorites(albumName) {
    localStorage.setItem(id, albumName);
    setIsInFavorite(true);
  }

  function removeFromFavorites() {
    localStorage.removeItem(id);
    setIsInFavorite(false);
  }

  useEffect(() => {
    async function getAlbumData() {
      const _albumData = await fetch(`https://spotify-rest.up.railway.app/album?id=${id}`)
        .then(r => r.json());

      setAlbumData(_albumData.data[0]);
    }

    getAlbumData();
    setIsInFavorite(localStorage.getItem(id) !== null);
  }, [id]);

  if (albumData === null) {
    return <LoadingPage />;
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="flex flex-col items-stretch text-center gap-3">
        <h1 className="text-3xl font-light">{albumData.name}</h1>
        <audio controls>
          <source src={albumData.preview_url} />
        </audio>
        {isInFavorites ?
          <button className="py-2 px-4 text-center text-lg bg-gray-200 hover:bg-gray-300" onClick={removeFromFavorites}>
            Remove From Favorites
          </button> :
          <button className="py-2 px-4 text-center text-lg bg-gray-200 hover:bg-gray-300" onClick={() => addToFavorites(albumData.name)}>
            Add To Favorites
          </button>
        }
      </div>
    </div>
  );
}

export default DetailPage;