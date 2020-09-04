interface IDefaultTheme {
	variables: {

	};
	colors: {
		bg: string,
		main: string;
		secondary: string;
		backgroundGradient: string;

	};
}

const tommyCupTheme: IDefaultTheme = {
	colors: {
		backgroundGradient: `linear-gradient(white, #fef8fa)`,
		bg: "#fff",
		main: "#11ceb0",
		secondary: "#27ae60",
	},
	variables: {

	},
};
const adminThemeOverwrites = {

};
const adminTheme = {
	...tommyCupTheme,
	colors: {
		...tommyCupTheme.colors,
		...adminThemeOverwrites,
	},
}
export { tommyCupTheme, adminTheme };
