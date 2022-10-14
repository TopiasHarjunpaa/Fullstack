import { useDispatch } from "react-redux";
import { handleLogout } from "../reducers/loginReducer";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const NavigateTab = () => {
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(handleLogout());
	};

	const padding = {
		paddingRight: 5,
	};

	return (
		<div>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#" as="span">
							<Link style={padding} to="/">
								Home
							</Link>
						</Nav.Link>
						<Nav.Link href="#" as="span">
							<Link style={padding} to="/users">
								Users
							</Link>
						</Nav.Link>
						<Nav.Link href="#" as="span">
							<Link style={padding} onClick={logout} to="/">
								Logout
							</Link>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default NavigateTab;
