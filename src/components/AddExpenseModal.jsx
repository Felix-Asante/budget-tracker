import React, { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetContext";
export default function AddExpenseModal({
	show,
	handleClose,
	defaultBudgetId,
}) {
	const { addExpense, budgets } = useBudgets();
	const amountRef = useRef();
	const descriptionRef = useRef();
	const budgetIdRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		addExpense({
			description: descriptionRef.current.value.trim(),
			amount: parseFloat(amountRef.current.value),
			budgetId: budgetIdRef.current.value.trim(),
		});

		handleClose();
	};
	return (
		<Modal show={show} onHide={{ handleClose }}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Mew Expense</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" required ref={descriptionRef} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="amount">
						<Form.Label>Amount</Form.Label>
						<Form.Control
							type="number"
							step={0.01}
							min={0}
							required
							ref={amountRef}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="budgetid">
						<Form.Label>Budget</Form.Label>
						<Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
							<option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>

							{budgets.map((budget) => (
								<option key={budget.id} value={budget.id}>
									{budget.name}
								</option>
							))}
						</Form.Select>
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
