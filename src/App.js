import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("forest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const accessKey = "-wY4zORaUdm-PxtdtprH4CFSdnRKl11H8XwZspIzGq0";
  const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${query}&page=${page}`;

  const fetchImages = () => {
    axios
      .get(fetchUrl)
      .then((response) => {
        setData([...data, ...response.data.results]);
      })
      .catch((error) => {
        console.log(error);
      });

    setPage(page + 1);
  };

  const listenToEnter = (e) => {
    if (e.keyCode === 13) {
      setQuery(e.target.value);
      setData([]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [query]);

  return (
    <div className="App flex">
      <input
        className="search-input"
        type="text"
        onKeyDown={(e) => listenToEnter(e)}
        placeHolder="Search Unsplash Images"
      />
      <InfiniteScroll
        dataLength={data.length}
        next={fetchImages}
        hasMore={hasMore}
        loader={<p>Load more...</p>}
        endMessage={<p>That's it for all the pictures.</p>}
      >
        <Card data={data} />
      </InfiniteScroll>
    </div>
  );
}

export default App;
