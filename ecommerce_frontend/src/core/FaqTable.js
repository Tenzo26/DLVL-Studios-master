import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import { addFaq } from "../admin/apiAdmin";
import { getFaq, updateFaq, deleteFaq } from "../admin/apiAdmin";
const EditableContext = React.createContext(null);

const styles = {
	marginBottom: "20px",
	padding: "12px",
};

const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider  value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};

const EditableCell = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef(null);
	const form = useContext(EditableContext);

	useEffect(() => {
		if (editing) {
			inputRef.current.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex],
		});
	};

	const save = async () => {
		try {
			const values = await form.validateFields();
			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log("Save failed:", errInfo);
		}

	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0,				
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${dataIndex.slice(0,1).toUpperCase()}${dataIndex.substring(1)} is required.`,						
					}, 
				]}
				
			>
				<Input.TextArea style={{borderRadius:"0", border:"1px black solid", padding:"10px"}}size="large" autoSize={{ minRows: 1, maxRows: 100  }} ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div
				className="editable-cell-value-wrap"
				style={{
					paddingRight: 24,
					whiteSpace:"pre",
					fontSize:"14px",
				}}
				onClick={toggleEdit}
			>
				{children}
			</div>
		);
	}

	return <td {...restProps}>{childNode}</td>;
};

function FaqTable() {
	const [dataSource, setDatasource] = useState([]);

	useEffect(() => {
		const fetchFaq = async () => {
			const res = await getFaq();
			const faqs = res.data.result.map((item) => ({
				title: item.title,
				content: item.content,
				key: item._id,
			}));
			setDatasource(faqs);
		};

		fetchFaq();
	}, []);

	const [form] = Form.useForm();

	const columns = [
		{
			
			title: () => (
				<div
				  style={{
					textAlign:"center"
				  }}
				><strong id="faqsTitleTable">TITLE</strong></div>),
				dataIndex: "title",
				editable: true,

		},
		{
			title: () => (
				<div
				  style={{
					textAlign:"center"
				  }}
				><strong id="faqsContentTable">CONTENT</strong></div>),
			dataIndex: "content",
			editable: true,
		},

		{
			title: () => (
				<div
				  style={{
					textAlign:"center"
				
				  }}
				><strong id="faqsCommandTable">DELETE</strong></div>),
			dataIndex: "operation",
			render: (_, record) =>
				dataSource.length >= 1 ? (
					<Popconfirm
						title="Is that your final answer?"
						onConfirm={() => handleDelete(record.key)}
					>
						<Button id="faqsDelete" >   </Button>
					</Popconfirm>
				) : null,
		},
	];

	const handleDelete = (key) => {
		const filter = dataSource.filter((item) => item.key !== key);
		setDatasource(filter);
		deleteFaq(key);
	};

	const onReset = () => {
		form.resetFields();
	};

	const handleAdd = async () => {
		let values = await form.validateFields();
		if (!values.title || !values.content) return alert ("Please check your question and content fields. They must contain a text.");

		const newData = {
			key: Math.random(),
			title: values.title,
			content: values.content,
		};

		addFaq(values.title, values.content);

		setDatasource((prev) => [...prev, newData]);
		onReset();
	};

	const handleSave = (row) => {
		const newData = [...dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, { ...item, ...row });
		setDatasource(newData);

		updateFaq(row);
	};

	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell,
			
		},
	};

	const cols = columns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave: handleSave,
			}),
		};
	});

	return (
		<div>
			<Form form={form} onFinish={handleAdd}>
			<h1 id="h1AdminFaqs">FAQs</h1>
				<Form.Item name="title">
					<Input.TextArea placeholder="Enter Question" id="faqsQAdmin"  />
				</Form.Item>
				<Form.Item name="content">
					<Input.TextArea  placeholder="Enter Content" id="faqsContentAdmin"  />
				</Form.Item>
				<Button
					htmlType="submit"
					
					id="saveFaqs"
				>
					SAVE
				</Button>
			</Form>

			<Table
				components={components}
				rowClassName={() => "editable-row"}
				bordered
				dataSource={dataSource}
				columns={cols}
				style={{overflow:"scroll"}}

			/>
		</div>
	);
}

export default FaqTable;
