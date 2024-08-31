import React, { useState } from "react";
import SwipeCard from "./SwipeCard";

const SwipeContainer = () => {
  const [data, setData] = useState([
    {
      id: 0,
      name: "Michael",
      age: 23,
      aboutMe: "I love going to the casino",
      imageUrl:
        "https://media.gq.com/photos/5e99baf8df7bcc00099c2acf/master/pass/01-Michael-Jordan-suit-god-gq-april-2020.jpg",
    },
    {
      id: 1,
      name: "Stephen",
      age: 30,
      aboutMe: "I like cooking",
      imageUrl:
        "https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwMDY5MDIwNzM5ODM5MjU3/warriors-stephen-curry-1-2048x1446.jpg",
    },
  ]);

  return (
    <div className="grid min-h-full grid-cols-1 place-items-center overflow-hidden">
      {data.map((card) => (
        <SwipeCard
          card={card}
          data={data}
          setData={setData}
          key={card.id + Math.random()}
        />
      ))}
    </div>
  );
};

export default SwipeContainer;
