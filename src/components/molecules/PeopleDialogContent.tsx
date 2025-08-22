import FormControlLabel from "@mui/material/FormControlLabel";
import GenderSwitch from "@/components/atoms/inputs/GenderSwitch";
import CheckSwitch from "@/components/atoms/inputs/CheckSwitch";
import { Box } from "@mui/material";

import { useState } from "react";
import { type PeopleInterface } from "@/interfaces";

export function PeopleDialogContent({ person }: { person: PeopleInterface }) {
	const [isFemale, setIsFemale] = useState(person.gender === "female");
	const [isTPApproved, setIsTPApproved] = useState(person.tpapproved);
	const [isTechSkilled, setIsTechSkilled] = useState(person.techskills);
	const [isPionner, setIsPionner] = useState(person.regularpionner);

	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: "repeat(3, 1fr)",
				gap: "1rem",
			}}
		>
			<FormControlLabel
				control={
					<GenderSwitch
						checked={isFemale}
						onChange={(e) => setIsFemale(e.target.checked)}
					/>
				}
				label="Gênero"
				sx={{
					color: "white",
				}}
			/>

			<FormControlLabel
				control={
					<CheckSwitch
						checked={isTPApproved}
						onChange={(e) => setIsTPApproved(e.target.checked)}
					/>
				}
				label="TP Aprovado"
				sx={{ color: "white" }}
			/>

			<FormControlLabel
				control={
					<CheckSwitch
						checked={isTechSkilled}
						onChange={(e) => setIsTechSkilled(e.target.checked)}
					/>
				}
				label="Tecnologia"
				sx={{ color: "white" }}
			/>

			<FormControlLabel
				control={
					<CheckSwitch
						checked={isPionner}
						onChange={(e) => setIsPionner(e.target.checked)}
					/>
				}
				label="Pioneiro"
				sx={{ color: "white" }}
			/>
		</Box>
	);
}
