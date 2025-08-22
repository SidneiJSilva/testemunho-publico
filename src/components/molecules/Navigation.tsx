import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useState } from "react";
import { navigationData } from "@/constants/navigation";
import { isMobileScreen } from "@/utils/screenSize";
import type { NavigationItem } from "@/interfaces";
import { useConditionalNavigate } from "@/hooks";

export default function ColorToggleButton() {
	const [page, setPage] = useState(navigationData[0].value);
	const { navigateTo } = useConditionalNavigate();

	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newValue: string
	) => {
		if (newValue === null) return;

		setPage(newValue);
		navigateTo(newValue);
	};

	const buttonsToRender: NavigationItem[] = isMobileScreen()
		? navigationData.filter((item: NavigationItem) => item.value !== "group")
		: navigationData;

	return (
		<ToggleButtonGroup
			value={page}
			size="small"
			exclusive
			onChange={handleChange}
		>
			{buttonsToRender.map((item) => (
				<ToggleButton
					key={item.value}
					value={item.value}
					sx={{
						color: "white",
						borderColor: "rgba(255, 255, 255, 0.3)",
						"&.Mui-selected": {
							color: "white",
							backgroundColor: "rgba(255, 255, 255, 0.2)",
						},
						"&:hover": {
							backgroundColor: "rgba(255, 255, 255, 0.1)",
						},
					}}
				>
					{item.label}
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
}
