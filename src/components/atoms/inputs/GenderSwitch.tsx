import Switch, { type SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const GenderSwitch = styled((props: SwitchProps) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
	width: 62,
	height: 34,
	padding: 7,
	"& .MuiSwitch-switchBase": {
		margin: 1,
		padding: 0,
		transform: "translateX(6px)",
		"&.Mui-checked": {
			color: "#fff",
			transform: "translateX(22px)",
			"& .MuiSwitch-thumb": {
				backgroundColor: "#EC4899",
			},
			"& .MuiSwitch-thumb:before": {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
					"#fff"
				)}" d="M12 4a4 4 0 1 1-3.46 2h-1.59v2H10v2H7v2h3v2H8v2h2v2h2v-2h2v-2h-2v-2h2v-2h-2V8.41A4 4 0 0 1 12 4z"/></svg>')`,
			},
			"& + .MuiSwitch-track": {
				opacity: 1,
				backgroundColor: "#aab4be",
			},
		},
	},
	"& .MuiSwitch-thumb": {
		backgroundColor: "#3B82F6",
		width: 32,
		height: 32,
		"&::before": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "100%",
			left: 0,
			top: 0,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				"#fff"
			)}" d="M19 3h-6v2h3.59l-4.13 4.13a5 5 0 1 0 1.41 1.41L18 6.41V10h2V4a1 1 0 0 0-1-1z"/></svg>')`,
		},
	},
	"& .MuiSwitch-track": {
		opacity: 1,
		backgroundColor: "#aab4be",
		borderRadius: 20 / 2,
	},
}));

export default GenderSwitch;
