
import { useSpatnavInitialization } from '@salutejs/spatial';
import HomePage from "./pages/HomePage";

function App() {
    useSpatnavInitialization();

    return <HomePage/>;
}

export default App
