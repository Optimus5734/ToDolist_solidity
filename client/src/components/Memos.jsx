import React, { useEffect, useState } from "react";

const Memos=({ state })=> {
  const [memos, setMemos] = useState([]);
  const { contract } = state;
  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.gettheList();
      setMemos(memos)
      console.log(memos);
    };
    contract && memosMessage();
  }, [contract]);
  return (
    <>
      {memos.map((memo) => {
        // eslint-disable-next-line react/jsx-key
        return <div className="note">
          <h1>Topic:-{memo.name}</h1>
          <h4>Note:-{memo.message}</h4>
          <p>Time-{new Date(memo.timestamp*1000).toLocaleString()}</p>
          <p className="from">from:{memo.from}</p>
        </div>;
      })}
    </>
  );
}

export default Memos;
