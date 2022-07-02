import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";

import './App.scss';
import Home from "./components/Home/Home";

const store = configureStore();

function App() {
  return (
  	<Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
