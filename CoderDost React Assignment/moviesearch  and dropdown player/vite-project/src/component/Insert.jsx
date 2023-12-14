import { useState } from "react";
import PropTypes from "prop-types";

function Insert({ updatelist }) {
  const initial = { name: "", code: "" };
  const [newnation, setnewnation] = useState(initial);

  function handlesubmit(e) {
    e.preventDefault();
    console.log(newnation.name ," ",newnation.code);
    updatelist(newnation.name, newnation.code);
    setnewnation(initial);
  }
  function handlechange(e) {
    setnewnation({...newnation, [e.target.name] : e.target.value });
  }

  return (
    <div className="insert">
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          value={newnation.name}
          name="name"
          placeholder="Enter nation"
          onChange={handlechange}
        />
        <br />
        <input
          type="text"
          value={newnation.code}
          name="code"
          placeholder="Enter value"
          onChange={handlechange}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

Insert.propTypes = {
  updatelist: PropTypes.func.isRequired,
};

export default Insert;
