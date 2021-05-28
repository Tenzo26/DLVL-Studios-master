import { Table, Space, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { isAuthenticated } from "../auth";

const { Column } = Table;


function FeedbackTable({ data, onUpdate, onDelete }) {
	const {
		user: { _id },
	} = isAuthenticated();

	return (
		<Table dataSource={data} style={{overflow:"scroll"}}>
			<Column title="NAME" dataIndex="name" key="firstName" />
			<Column title="FEEDBACK" dataIndex="content" key="content" />
			<Column title="STATUS" dataIndex="status" key="status" />
			<Column
				title="ACTION"
				key="action"
				render={(text, record) => (
					<Space size="middle">
						{record.status === "Pending" ? (
							<Button type="primary" id="FeedbackPostBtn" onClick={() => onUpdate(record.key)}> </Button>
						) : (
							<Button disabled="true" id="FeedbackPostDBtn"> </Button>
						)}
						<Popconfirm
						title="Is that your final answer?"
						onConfirm={() => onDelete(record.key)}
						>
						<Button id="FeedbackDelBtn" >   </Button>
					</Popconfirm>
					</Space>
				)}
			/>
		</Table>
	);
}

export default FeedbackTable;
