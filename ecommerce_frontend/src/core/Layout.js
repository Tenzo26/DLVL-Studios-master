import React from "react";
import "../styles.css";
import logo from './logo.PNG';


const Layout = ({
	title = "Untitled",
	description = "Undescribed",
	className,
	children,
	hasBg = false,
	imgSrc = null,
}) => {
	const styles =
		hasBg === true
			? {
					minWidth: "100%",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundImage: `url(${imgSrc})`,
			  }
			: null;

	return (
		<div>
			<div style={styles}>
				<img id ="logo" src={logo} />
				<div className={className}>{children}</div>
			</div>
		</div>
	);
};

export default Layout;
