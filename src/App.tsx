import { useState } from 'react';
import NavBar, { type Screen } from './components/NavBar.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import AboutScreen from './screens/AboutScreen.tsx';

// Screens are switched via in-memory state only (no router, no page reload).
export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <div className="app">
      <main className="app__content">
        {screen === 'home' ? <HomeScreen /> : <AboutScreen />}
      </main>
      <NavBar active={screen} onChange={setScreen} />
    </div>
  );
}
