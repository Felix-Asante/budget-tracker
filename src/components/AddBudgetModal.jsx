import React, { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudgets } from "../context/BudgetContext";
export default function AddBudgetModal({ show, handleClose }) {
	const { addBudget } = useBudgets();
	const nameRef = useRef();
	const maxRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		addBudget({
			name: nameRef.current.value.trim(),
			max: maxRef.current.value.trim(),
		});

		handleClose();
	};
	return (
		<Modal show={show} onHide={{ handleClose }}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Mew Budget</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" required ref={nameRef} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="max">
						<Form.Label>Maximum Spending</Form.Label>
						<Form.Control
							type="number"
							step={0.01}
							min={0}
							required
							ref={maxRef}
						/>
					</Form.Group>
					<div className="d-flex justify-content-end">
						<Button type="submit" variant="primary">
							Add
						</Button>
					</div>
				</Modal.Body>
			</Form>
		</Modal>
	);
}
