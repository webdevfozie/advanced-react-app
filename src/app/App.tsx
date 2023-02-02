import { Suspense } from 'react'
import 'app/styles/index.scss'
import { Link, Route, Routes } from 'react-router-dom'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { MainPage } from 'pages/MainPage'
import { AboutPage } from 'pages/AboutPage'

const App = () => {
	const {theme, toggleTheme} = useTheme()

	return (
		<div className={classNames('app', {}, [theme])}>
			<button onClick={toggleTheme}>Переключить тему</button>
			<Link to="/main">MainPage</Link>
			<Link to="/about">AboutPage</Link>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={'/main'} element={<MainPage />} />
					<Route path={'/about'} element={<AboutPage />} />
				</Routes>
			</Suspense>
		</div>
	)
}

export default App