import { ethers } from "ethers";
import React, { useState } from "react";

function Buy({state}) {
  const [exp, setExp] = useState(false);

  function expand() {
    setExp(true);
  }
  const addNote = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = { value: ethers.utils.parseEther("0.00001") }; //the value is in the form of wei thus we convert it to ether
    const transaction = await contract.createToDo(name, message, amount);
    await transaction.wait();
    window.location.reload();
  };

  return (
    <div className="buy">
      <form className="create-note" onSubmit={addNote}>
        <input id="name" onClick={expand} placeholder="Topic" />
        {exp ? (
          <textarea
            id="message"
            name="content"
            placeholder="Take a note..."
            rows={exp ? 3 : 1}
          />
        ) : null}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Buy;
