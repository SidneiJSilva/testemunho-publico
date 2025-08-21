import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useState } from "react";
import { navigationData } from "@/constants/navigation";
import { isMobileScreen } from "@/utils/screenSize";
import type { NavigationItem } from "@/types";
import { useNavigate } from "react-router-dom";

export default function ColorToggleButton() {
	const [page, setPage] = useState(navigationData[0].value);
	const navigate = useNavigate();

	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newValue: string
	) => {
		setPage(newValue);
		navigate(`../${newValue}`);
	};

	const buttonsToRender: NavigationItem[] = isMobileScreen()
		? navigationData.filter((item: NavigationItem) => item.value !== "group")
		: navigationData;

	return (
		<ToggleButtonGroup
			color="primary"
			value={page}
			size="small"
			exclusive
			onChange={handleChange}
		>
			{buttonsToRender.map((item) => (
				<ToggleButton value={item.value}>{item.label}</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
}
