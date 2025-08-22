import PeopleCard from "../molecules/PeopleCard";
import LoadingFullScreen from "@/components/atoms/loadings/LoadingFullScreen";
import { Box } from "@mui/material";

import { peopleStore } from "@/stores";
import { type PeopleInterface } from "@/interfaces";

const PeopleList = ({ people }: { people: PeopleInterface[] }) => {
	const { isLoading } = peopleStore();

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
				<PeopleCard key={person.peopleid} person={person} />
			))}
		</Box>
	);
};

export default PeopleList;
