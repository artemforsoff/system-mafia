import React from 'react';
import { PlayersTable } from './components/PlayersTable/PlayersTable.jsx';
import { Timer } from './components/Timer/Timer';

function App() {
	return (
		<div className="App">
			<Timer />
			<PlayersTable />
		</div>
	);
}

export default App;
