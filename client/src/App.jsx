import AddEntry from "./components/AddEntry";
import CalorieList from "./components/CalorieList";
import DayView from "./components/DayView";

const App = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold bg-blue-700 text-white p-4">
        Calorie Tracker
      </h1>
      <div>
        <AddEntry />
        <CalorieList />
        <DayView />
      </div>
    </div>
  );
};

export default App;
