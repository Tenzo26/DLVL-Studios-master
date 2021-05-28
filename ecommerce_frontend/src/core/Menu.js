import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
import { itemTotal } from "./cartHelpers";
import { ToolFilled } from "@ant-design/icons";


const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "black",
		};
	} else {
		return {
			color: "black",
		};
	}
};

const Menu = ({ history }) => (
	<div>
		
	
			{!isAuthenticated() && (
				<Fragment>
					<label className="nav-item">
						<Link
							className="signinoutmenu"
							style={isActive(history, "/signin")}
							to="/signin"
						>
						
						</Link>
					</label>
				</Fragment>
			)}

			{isAuthenticated() && (
				<label className="nav-item">
					<span
						className="signinoutmenu"
						onClick={() =>
							signout(() => {
								history.push("/signin");
							})
						}
					> <button id="outlog"></button>
						LOG OUT
					</span>
				</label>
			)}

		
		
	</div>
);

export default withRouter(Menu);


