import PeopleCard from "../molecules/PeopleCard";
import LoadingFullScreen from "@/components/atoms/loadings/LoadingFullScreen";
import { Box } from "@mui/material";

import { usePeople } from "@/hooks";
import { useEffect } from "react";
import { peopleStore } from "@/stores";

const People = () => {
	const { fetchPeople } = usePeople();
	const { people, isLoading } = peopleStore();

	useEffect(() => {
		const fetchData = async () => {
			await fetchPeople();
		};

		if (people.length === 0) {
			fetchData();
		}
	}, []);

	return isLoading ? (
		<LoadingFullScreen />
	) : (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: {
					xs: "1fr",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
				},
				gap: "2rem",
			}}
		>
			{people.map((person) => (
				<PeopleCard person={person} />
			))}
		</Box>
	);
};

export default People;
