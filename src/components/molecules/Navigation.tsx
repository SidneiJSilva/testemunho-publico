import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import HailIcon from "@mui/icons-material/Hail";
import ComputerIcon from "@mui/icons-material/Computer";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import CloseIcon from "@mui/icons-material/Close";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

import { useState } from "react";
import { navigationData } from "@/constants/navigation";
import { useConditionalNavigate, useFilters } from "@/hooks";
import { useLocation } from "react-router-dom";
import {
	Box,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import { peopleStore } from "@/stores";
import { colors } from "@/constants/colors";

export default function ColorToggleButton() {
	const location = useLocation();
	const [page, setPage] = useState(
		location.pathname.replace("/", "") || navigationData[0].value
	);
	const { navigateTo } = useConditionalNavigate();
	const { filterBy } = peopleStore();
	const { applyFilter } = useFilters();
	const [filterString, setFilterString] = useState("");

	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newValue: string
	) => {
		if (newValue === null) return;

		setPage(newValue);
		navigateTo(newValue);
	};

	const filters = [
		{ value: "tpapproved", item: <HailIcon /> },
		{ value: "techskills", item: <ComputerIcon /> },
		{ value: "regularpionner", item: <BusinessCenterIcon /> },
		{ value: "male", item: <ManIcon /> },
		{ value: "female", item: <WomanIcon /> },
		{ value: "inactive", item: <PersonOffIcon /> },
	];

	const handleFilterChange = (
		event: React.MouseEvent<HTMLElement>,
		newFilters: string[]
	) => {
		const clickedValue = (event.currentTarget as HTMLButtonElement).value;

		let finalFilters = [...newFilters];

		if (newFilters.includes("inactive")) {
			finalFilters = ["inactive"];
		} else if (clickedValue === "male" && newFilters.includes("male")) {
			finalFilters = finalFilters.filter((filter) => filter !== "female");
		} else if (clickedValue === "female" && newFilters.includes("female")) {
			finalFilters = finalFilters.filter((filter) => filter !== "male");
		}

		applyFilter(finalFilters, filterString);
	};

	const handleFilterString = (newString: string) => {
		setFilterString(newString);
		applyFilter(filterBy, newString);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: {
					xs: "column",
					md: "row",
				},
				alignItems: {
					xs: "flex-start",
					md: "center",
				},
				justifyContent: "space-between",
				width: "100%",
				gap: 2,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flex: 1,
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					gap: 2,
				}}
			>
				<ToggleButtonGroup
					value={page}
					size="small"
					exclusive
					onChange={handleChange}
				>
					{navigationData.map((item) => (
						<ToggleButton
							key={item.value}
							value={item.value}
							sx={{
								"&.Mui-selected": {
									color: colors.primary,
									backgroundColor: colors.secondary,
								},
								"&:hover": {
									backgroundColor: colors.border,
								},
								"&.Mui-selected:hover": {
									backgroundColor: colors.background,
								},
							}}
						>
							{item.label}
						</ToggleButton>
					))}
				</ToggleButtonGroup>

				<Box
					sx={{
						display: "flex",
						gap: 2,
						alignItems: "center",
					}}
				>
					{page === "people" && (
						<>
							<FormControl
								sx={{
									width: "25ch",
									display: { xs: "none", md: "flex" },
								}}
								variant="outlined"
								size="small"
							>
								<InputLabel>Pesquisa</InputLabel>
								<OutlinedInput
									value={filterString}
									onChange={(e) => handleFilterString(e.target.value)}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												onClick={() => handleFilterString("")}
												edge="end"
											>
												<CloseIcon />
											</IconButton>
										</InputAdornment>
									}
									label="Pesquisa"
								/>
							</FormControl>

							<ToggleButtonGroup
								value={filterBy}
								size="small"
								onChange={handleFilterChange}
								sx={{
									display: { xs: "flex", md: "flex" },
									flexWrap: "wrap",
								}}
							>
								{filters.map((filter) => (
									<ToggleButton
										key={filter.value}
										value={filter.value}
										sx={{
											"&.Mui-selected": {
												color: colors.primary,
												backgroundColor: colors.secondary,
											},
											"&:hover": {
												backgroundColor: colors.border,
											},
											"&.Mui-selected:hover": {
												backgroundColor: colors.background,
											},
										}}
									>
										{filter.item}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
						</>
					)}
				</Box>
			</Box>

			{page === "people" && (
				<FormControl
					sx={{
						width: "100%",
						display: { xs: "flex", md: "none" },
					}}
					variant="outlined"
					size="small"
				>
					<InputLabel>Pesquisa</InputLabel>

					<OutlinedInput
						value={filterString}
						onChange={(e) => handleFilterString(e.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton onClick={() => handleFilterString("")} edge="end">
									<CloseIcon />
								</IconButton>
							</InputAdornment>
						}
						label="Pesquisa"
					/>
				</FormControl>
			)}
		</Box>
	);
}
