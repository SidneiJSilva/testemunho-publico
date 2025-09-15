import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { peopleStore } from "@/stores";
import { useMemo } from "react";

interface Publisher {
	id: number;
	label: string;
}

interface Assignment {
	locationId: number;
	publishers: Publisher[];
}

interface WeekdayDataItem {
	date: string; // "2025-09-15"
	assignments: Assignment[];
}

interface Slot {
	placeId: number;
	placeName: string;
	time: string;
}

interface DaySchema {
	weekday: string;
	slots: Slot[];
}

interface NormalizedRow {
	placeId: number;
	placeName: string;
	time: string;
	dates: Record<string, Publisher[]>; // { "2025-09-15": [ {id, label}, ... ] }
}

// Função para normalizar os dados
function normalizeSchedule(
	day: DaySchema,
	weekdayData: WeekdayDataItem[]
): NormalizedRow[] {
	const locationsMap: Record<number, NormalizedRow> = {};

	weekdayData.forEach((dateItem) => {
		dateItem.assignments.forEach((assignment) => {
			if (!locationsMap[assignment.locationId]) {
				const slotInfo = day.slots.find(
					(s) => s.placeId === assignment.locationId
				);
				locationsMap[assignment.locationId] = {
					placeId: assignment.locationId,
					placeName: slotInfo?.placeName || "",
					time: slotInfo?.time || "",
					dates: {},
				};
			}
			locationsMap[assignment.locationId].dates[dateItem.date] =
				assignment.publishers;
		});
	});

	return Object.values(locationsMap);
}

export default function ScheduleWeekDay({
	day,
	weekdayData,
}: {
	day: DaySchema;
	weekdayData: WeekdayDataItem[];
}) {
	const { people } = peopleStore();

	const tableData = useMemo(
		() => normalizeSchedule(day, weekdayData),
		[day, weekdayData]
	);

	const columns = useMemo(() => {
		return ["Local / Hora", ...(weekdayData?.map((item) => item.date) || [])];
	}, [weekdayData]);

	return (
		<>
			{people.length && weekdayData?.length && (
				<div>
					<Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
						<strong style={{ textTransform: "capitalize" }}>
							{day.weekday}
						</strong>
					</Box>

					<TableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650 }}
							size="small"
							aria-label="schedule table"
						>
							<TableHead>
								<TableRow>
									{columns.map((col, index) => (
										<TableCell key={index}>{col}</TableCell>
									))}
								</TableRow>
							</TableHead>

							<TableBody>
								{tableData.map((row) => (
									<TableRow key={row.placeId}>
										<TableCell component="th" scope="row">
											{row.placeName} - {row.time}
										</TableCell>

										{columns.slice(1).map((date) => (
											<TableCell key={date} align="center">
												<Box
													sx={{
														display: "flex",
														flexDirection: "column",
														alignItems: "center",
													}}
												>
													{(row.dates[date] || []).map((pub, idx) => (
														<FormControl
															key={idx}
															size="small"
															sx={{ minWidth: 120, mb: 1 }}
														>
															<InputLabel
																id={`select-pub-${row.placeId}-${date}-${idx}`}
															>
																Publicador
															</InputLabel>
															<Select
																labelId={`select-pub-${row.placeId}-${date}-${idx}`}
																value={pub.id}
																label="Publicador"
															>
																{people.map((p) => (
																	<MenuItem key={p.peopleid} value={p.peopleid}>
																		{p.fullname}
																	</MenuItem>
																))}
															</Select>
														</FormControl>
													))}
												</Box>
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			)}
		</>
	);
}
