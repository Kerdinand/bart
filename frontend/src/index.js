import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/Navbar/Navbar';
import Search from './components/Search/Search';

ReactDOM.render(
	<React.StrictMode>
		<Navbar></Navbar>
		<Search></Search>
	</React.StrictMode>,
	document.getElementById('root')
);
