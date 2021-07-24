import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function ListPage() {
  const { artist } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function getAlbums() {
      const artistQuery = await fetch(`https://spotify-rest.up.railway.app/artist?query=${artist}`)
        .then(r => r.json());

      setArtistData({
        name: artistQuery.data.name,
        image: artistQuery.data.image,
      });

      setAlbums(artistQuery.data.albums);
    }

    getAlbums();
  }, [artist]);

  if (artistData === null) {
    return <LoadingPage />;
  }

  return (
    <div className="w-screen min-h-screen flex flex-col justify-stretch bg-gray-100 p-2">
      <div className="flex p-4 gap-4">
        <div>
          <img src={artistData.image} alt="" width="100px" height="150px" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h2>Showing albums from:</h2>
          <h1 className="text-4xl">{artistData.name}</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center p-4 gap-3">
        {albums.map(album => 
          <Link key={album.id} to={`/detail/${album.id}`} className="flex flex-col p-2 bg-gray-200 shadow hover:shadow-lg" style={{width: "300px"}}>
            <img src={album.image} alt="" />
            <h3 className="mt-2 font-semibold truncate">{album.name}</h3>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ListPage;