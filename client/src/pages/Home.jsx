import React, { useState, useEffect } from "react";
import { Card } from "../components";
import { getPost } from "../api/Api";
import { VscEmptyWindow } from "react-icons/vsc";
const Home = () => {
  const [list, setList] = useState([]);
  const getData = async () => {
    const response = await getPost();
    setList(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Showcase</h1>
      </div>
      <div className="mt-5">
        {list.length == 0 ? (
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-[25px] font-semibold">There are no Posts</h1>
            <VscEmptyWindow className="h-72 w-64" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {list.map((e) => {
              return (
                <Card key={e._id} post={e} list={list} setList={setList} />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
