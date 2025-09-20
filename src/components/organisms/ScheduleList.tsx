import ScheduleWeekDay from "../molecules/ShceduleWeekDay";
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import LoadingFullScreen from "@/components/atoms/loadings/LoadingFullScreen";
import NewPlaceDialog from "./NewPlaceDialog";

import { colors } from "@/constants/colors";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { peopleStore, schemaStore, scheduleStore, dialogStore } from "@/stores";
import { useEffect } from "react";

export default function ScheduleList() {
	const { isLoading } = peopleStore();
	const {
		schema,
		isLoading: schemaLoading,
		schemaList,
		schemaId,
		setSchemaId,
	} = schemaStore();
	const { startDate, endDate, setDates, schedule } = scheduleStore();
	const { openNewPlaceDialog, setOpenNewPlaceDialog } = dialogStore();

	useEffect(() => {
		const startDate = dayjs().startOf("week").add(1, "day");
		const endDate = dayjs().startOf("week").add(4, "week");

		setDates(startDate, endDate);
	}, []);

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
							justifyContent: "space-between",
							gap: 2,
							padding: ".5rem",
							paddingTop: ".75rem",
							backgroundColor: "white",
							border: 1,
							borderColor: colors.border,
							borderRadius: ".5rem",
						}}
					>
						<FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
							<InputLabel id="select-family-member">Familiar</InputLabel>

							<Select
								labelId="select-family-member"
								id="family-member-select"
								value={schemaId}
								label="Familiar"
								onChange={(e) => setSchemaId(e.target.value as string)}
							>
								{schemaList.map((s) => (
									<MenuItem value={s.id}>{s.name}</MenuItem>
								))}
							</Select>
						</FormControl>

						<Box display="flex" gap={2} justifyContent="center">
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								adapterLocale="pt-br"
							>
								<DatePicker
									label="Data inicial"
									format="DD/MM/YYYY"
									slotProps={{
										textField: { size: "small" },
									}}
									value={startDate}
									onChange={(newValue) => {
										if (!newValue) return;
										setDates(newValue, endDate);
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
									minDate={startDate || dayjs()}
									slotProps={{
										textField: { size: "small" },
									}}
									value={endDate}
									onChange={(newValue) => {
										if (!newValue) return;
										setDates(startDate, newValue);
									}}
								/>
							</LocalizationProvider>
						</Box>
					</Box>

					{schema?.days &&
						schema.days.map((day: any) => (
							<ScheduleWeekDay
								key={day.weekday}
								day={day}
								weekdayData={schedule[day.weekday.toLowerCase()]}
							/>
						))}

					<NewPlaceDialog
						openDialog={openNewPlaceDialog}
						closeDialog={() => setOpenNewPlaceDialog(false)}
					/>
				</Box>
			)}
		</>
	);
}
