import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Movielist from "./components/movielist/Movielist";
import Moviedetails from "./components/moviedetails/Moviedetails";

type ActiveTab = "detail" | "list";

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("list");
  const loadTab = () => {
    switch (activeTab) {
      case "detail":
        return <Moviedetails tab={activeTab} />;
      case "list":
      default:
        return <Movielist />;
    }
  };

  return (
    <div className="w-screen h-screen bg-[#050716cf]">
      <div className="w-full h-full flex">
        <div className="w-[20%] h-full relative bg-gradient-to-r from-[#00030b] to-[#0a0a1d96] hidden md:block text-[#d0d0d0]">
          <Sidebar />
        </div>
        <div className="w-full md:w-[80%] h-full bg-gradient-to-r from-[#000008bf] to-[#010613a4] overflow-y-scroll">
          <Header tab={setActiveTab} />
          {loadTab()}
        </div>
      </div>
    </div>
  );
}

export default App;
