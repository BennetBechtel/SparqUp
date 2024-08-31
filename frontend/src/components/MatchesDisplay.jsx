import React from "react";

const MatchesDisplay = () => {
  const matches = [
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
  ];

  if (matches.length === 0) {
    return <>You dont have any matches yet...</>;
  }

  return (
    <div
      className="scrollbar-hide grid w-full grid-cols-2 gap-1 overflow-y-scroll"
      style={{
        height: "calc(100vh - (206px)",
      }}
    >
      {matches.map((match) => (
        <div
          key={match.id + Math.random()}
          className="relative h-52 overflow-hidden rounded-md hover:cursor-pointer"
        >
          <img src={match.imageUrl} className="h-full w-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-25 p-2 text-white">
            {match.name}, {match.age}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
