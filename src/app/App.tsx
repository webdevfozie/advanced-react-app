import 'app/styles/index.scss'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widgets/Navbar'

const App = () => {
	const {theme, toggleTheme} = useTheme()

	return (
		<div className={classNames('app', {}, [theme])}>
			<Navbar />
			<AppRouter />
			<button onClick={toggleTheme}>Переключить тему</button>
		</div>
	)
}

export default App