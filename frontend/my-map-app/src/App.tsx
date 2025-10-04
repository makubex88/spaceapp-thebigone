
import FaultOverlay from "./components/FaultOverlay";
import HazardMap from "./components/HazardMap";

function App() {
  return (
    <div className="App">
      <h1 className="text-center font-bold text-xl p-2">
        Ground Rupture Hazard Map - Rizal Province
      </h1>
      <HazardMap />
      
    </div>
  );
}

export default App;
