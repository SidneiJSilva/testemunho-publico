import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import HailIcon from "@mui/icons-material/Hail";
import ComputerIcon from "@mui/icons-material/Computer";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

import { useState } from "react";
import { navigationData } from "@/constants/navigation";
import { isMobileScreen } from "@/utils/screenSize";
import type { NavigationItem } from "@/interfaces";
import { useConditionalNavigate, useFilters } from "@/hooks";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { peopleStore } from "@/stores";

export default function ColorToggleButton() {
	const location = useLocation();
	const [page, setPage] = useState(
		location.pathname.replace("/", "") || navigationData[0].value
	);
	const { navigateTo } = useConditionalNavigate();
	const { sortBy } = peopleStore();
	const { applyFilter } = useFilters();

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

	const filters = [
		{
			value: "tpapproved",
			item: <HailIcon />,
		},
		{
			value: "techskills",
			item: <ComputerIcon />,
		},
		{
			value: "regularpionner",
			item: <BusinessCenterIcon />,
		},
		{
			value: "male",
			item: <ManIcon />,
		},
		{
			value: "female",
			item: <WomanIcon />,
		},
	];

	const handleFilterChange = (
		_event: React.MouseEvent<HTMLElement>,
		newValue: string
	) => {
		applyFilter(newValue);
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
			}}
		>
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

			{page === "people" && (
				<ToggleButtonGroup
					value={sortBy}
					size="small"
					exclusive
					onChange={handleFilterChange}
				>
					{filters.map((filter) => (
						<ToggleButton
							value={filter.value}
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
							{filter.item}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			)}
		</Box>
	);
}
