import ScheduleWeekDay from "../molecules/ShceduleWeekDay";

import { Typography } from "@mui/material";

export default function ScheduleList() {
	return (
		<div>
			<Typography variant="h6" component="div" textAlign={"center"}>
				Programação de Testemunho Público
			</Typography>

			<ScheduleWeekDay />
		</div>
	);
}
