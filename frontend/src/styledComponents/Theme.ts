interface IDefaultTheme {
	variables: {
		breakpoint0: string;
		breakpoint1: string;
		breakpoint2: string;
		breakpoint3: string;
		spacing: number;
		container: number;
		transitionTime: number;
		transitionEase: string;
	};
	colors: {
		bg: string;
		bg1: string;
		bg2: string;
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
		bg1: "#fafafa",
		bg2: "#e4e4e4",
		secondary: "#27ae60",
	},
	variables: {
		breakpoint0: `576px`,
		breakpoint1: `768px`,
		breakpoint2: `992px`,
		breakpoint3: `1200px`,
		container: 500,
		spacing: 0.5,
		transitionEase: `cubic-bezier(0.18, 0.89, 0.32, 1.28)`,
		transitionTime: 0.3,
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
