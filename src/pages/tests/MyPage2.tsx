import { useNavigate } from "react-router-dom";

const MyPage2 = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>My Page 2</h1>
			<p>This is my page content.</p>
			<button onClick={() => navigate("../dashboard")}>Dashboard</button>
		</div>
	);
};

export default MyPage2;
