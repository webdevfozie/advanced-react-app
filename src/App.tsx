import { Suspense } from 'react'
import './styles/index.scss'
import { Link, Route, Routes } from 'react-router-dom'
import { MainPageAsync } from './pages/MainPage/MainPage.async'
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async'
import { useTheme } from './theme/useTheme'
import { classNames } from './helpers/classNames/classNames'

const App = () => {
	const {
		theme,
		toggleTheme
	} = useTheme()

	return (
		<div className={classNames('app', {}, [theme, 'css'])}>
			<button onClick={toggleTheme}>Переключить тему</button>
			<Link to="/main">MainPage</Link>
			<Link to="/about">AboutPage</Link>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={'/main'} element={<MainPageAsync />} />
					<Route path={'/about'} element={<AboutPageAsync />} />
				</Routes>
			</Suspense>
		</div>
	)
}

export default App