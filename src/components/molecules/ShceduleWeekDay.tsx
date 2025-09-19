import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import { peopleStore } from "@/stores";
import { useMemo, useState } from "react";
import { pt } from "@/i18n/pt";
import dayjs from "dayjs";
import { colors } from "@/constants/colors";

import type { DaySchema, WeekdayDataItem, NormalizedRow } from "@/interfaces";

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
	index,
}: {
	day: DaySchema;
	weekdayData: WeekdayDataItem[];
	index: number;
}) {
	const { people } = peopleStore();
	const [isEditing, setIsEditing] = useState(false);

	const tableData = useMemo(
		() => normalizeSchedule(day, weekdayData),
		[day, weekdayData]
	);

	const columns = useMemo(() => {
		return ["Local / Hora", ...(weekdayData?.map((item) => item.date) || [])];
	}, [weekdayData]);

	const addNewPlace = () => {
		console.log("Add new place clicked", day);
		console.log("Add new place clicked", index);
	};

	return (
		<>
			{people.length && weekdayData?.length && (
				<Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							position: "relative",
						}}
					>
						<Typography
							variant="subtitle1"
							fontWeight={700}
							sx={{ flexGrow: 1, textAlign: "center" }}
						>
							{pt[day.weekday.toLowerCase() as keyof typeof pt]}
						</Typography>

						<IconButton
							onClick={() => setIsEditing(!isEditing)}
							sx={{ position: "absolute", right: 0 }}
						>
							{isEditing ? (
								<CloseIcon sx={{ fontSize: "1.2rem", color: colors.error }} />
							) : (
								<EditIcon sx={{ fontSize: "1.2rem", color: colors.primary }} />
							)}
						</IconButton>
					</Box>

					<TableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650, tableLayout: "fixed", width: "100%" }}
							size="small"
							aria-label="schedule table"
						>
							<TableHead>
								<TableRow>
									{columns.map((col, index) => (
										<TableCell
											key={index}
											sx={{
												fontWeight: "bold",
												textAlign: index === 0 ? "left" : "center",
												width:
													index === 0
														? "250px"
														: `${100 / (columns.length - 1)}%`,
											}}
										>
											{index === 0 ? col : dayjs(col).format("DD/MM/YYYY")}
										</TableCell>
									))}
								</TableRow>
							</TableHead>

							<TableBody>
								{tableData.map((row) => (
									<TableRow key={row.placeId}>
										<TableCell
											component="th"
											scope="row"
											sx={{ fontWeight: 500, width: "250px" }}
										>
											<Box
												sx={{
													display: "flex",
													gap: 0.5,
													justifyContent: "space-between",
												}}
											>
												<div>
													<Typography
														variant="body2"
														fontWeight={700}
														color={colors.textSubtitles}
													>
														{row.placeName}
													</Typography>

													<Typography variant="body1">{row.time}</Typography>
												</div>

												{isEditing && (
													<IconButton>
														<DeleteIcon
															sx={{ fontSize: "1.2rem", color: colors.error }}
														/>
													</IconButton>
												)}
											</Box>
										</TableCell>

										{columns.slice(1).map((date) => (
											<TableCell
												key={date}
												align="center"
												sx={{
													width: `${100 / (columns.length - 1)}%`,
													verticalAlign: "top",
												}}
											>
												<Box
													sx={{
														display: "flex",
														flexDirection: "column",
														alignItems: "center",
														gap: 1,
													}}
												>
													{(row.dates[date] || []).map((pub, idx) => (
														<Box
															sx={{ minWidth: "100%", maxWidth: 120 }}
															key={idx}
														>
															{isEditing ? (
																<FormControl
																	size="small"
																	sx={{ minWidth: "100%", maxWidth: 120 }}
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
																		fullWidth
																	>
																		{people.map((p) => (
																			<MenuItem
																				key={p.peopleid}
																				value={p.peopleid}
																			>
																				{p.fullname}
																			</MenuItem>
																		))}
																	</Select>
																</FormControl>
															) : (
																<div>{pub.id || "-"}</div>
															)}
														</Box>
													))}
												</Box>
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					{isEditing && (
						<Box sx={{ display: "flex", gap: 2 }}>
							<Button
								variant="contained"
								size="small"
								onClick={() => addNewPlace()}
							>
								Adicionar
							</Button>
						</Box>
					)}
				</Box>
			)}
		</>
	);
}
