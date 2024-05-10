import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Events from "../../components/Events/Events";

export default function Home() {
  return (
    <div>
      <Navbar title={"RedLobby"} />
      <Events />
    </div>
  );
}
