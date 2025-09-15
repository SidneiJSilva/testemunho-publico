import ScheduleWeekDay from "../molecules/ShceduleWeekDay";
import { Box, Typography } from "@mui/material";
import LoadingFullScreen from "@/components/atoms/loadings/LoadingFullScreen";

import { colors } from "@/constants/colors";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";
import { peopleStore, schemaStore } from "@/stores";

export default function ScheduleList() {
	const [newStartDate, setNewStartDate] = useState<Dayjs | null>(dayjs());
	const [newEndDate, setNewEndDate] = useState<Dayjs | null>(dayjs());
	const { isLoading } = peopleStore();
	const { schema, isLoading: schemaLoading } = schemaStore();

	console.log("ScheduleList - schema:", schema);

	return (
		<>
			{isLoading || schemaLoading ? (
				<LoadingFullScreen />
			) : (
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<Typography variant="h6" component="div" textAlign={"center"}>
						Programação de Testemunho Público
					</Typography>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "0.5rem",
							padding: ".5rem",
							paddingTop: ".75rem",
							backgroundColor: "white",
							border: 1,
							borderColor: colors.border,
							borderRadius: ".5rem",
						}}
					>
						<LocalizationProvider
							dateAdapter={AdapterDayjs}
							adapterLocale="pt-br"
						>
							<DatePicker
								label="Data inicial"
								format="DD/MM/YYYY"
								minDate={dayjs()}
								slotProps={{
									textField: { size: "small" },
								}}
								value={newStartDate}
								onChange={(newValue) => {
									setNewStartDate(newValue);
									setNewEndDate(newValue);
								}}
							/>
						</LocalizationProvider>

						<LocalizationProvider
							dateAdapter={AdapterDayjs}
							adapterLocale="pt-br"
						>
							<DatePicker
								label="Data final"
								format="DD/MM/YYYY"
								minDate={newStartDate || dayjs()}
								slotProps={{
									textField: { size: "small" },
								}}
								value={newEndDate}
								onChange={(newValue) => setNewEndDate(newValue)}
							/>
						</LocalizationProvider>
					</Box>

					{schema?.days &&
						schema.days.map((day) => (
							<ScheduleWeekDay key={day.weekday} day={day} />
						))}
				</Box>
			)}
		</>
	);
}
