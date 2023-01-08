import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
	const notification = useSelector((state) => state.notifications);

	if (!notification.content) {
		return <div style={{ padding: 15 }} />;
	}

	return (
		<div>
			<Alert variant={notification.success ? "success" : "danger"}>
				{notification.content}
			</Alert>
		</div>
	);
};

export default Notification;
