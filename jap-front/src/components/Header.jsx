import React from "react";

const header = React.memo(({ balance }) => {
  return <header>رصيدك : {balance}</header>;
});

export default header;
