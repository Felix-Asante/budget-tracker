import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import { useBudgets } from "./context/BudgetContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
function App() {
	const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
	const [showExpenseModal, setShowExpenseModal] = useState(false);
	const [expenseBudgetId, setExpenseBudgetId] = useState();
	const { budgets, getBudgetExpenses } = useBudgets();

	const openAddExpenseModal = (budgetId) => {
		setShowExpenseModal(true);
		setExpenseBudgetId(budgetId);
	};
	return (
		<>
			<Container className="my-4">
				<Stack direction="horizontal" gap="2" className="mb-4">
					<h1 className="me-auto">Budgets</h1>
					<Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
						Add Budget
					</Button>
					<Button variant="outline-primary" onClick={openAddExpenseModal}>
						Add Expenses
					</Button>
				</Stack>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr)",
						gap: "1rem",
						alignItems: "flex-start",
					}}
				>
					{budgets.map((budget) => {
						const amount = getBudgetExpenses(budget.id).reduce(
							(total, expense) => total + expense.amount,
							0
						);
						return (
							<BudgetCard
								name={budget.name}
								amount={amount}
								max={budget.max}
								key={budget.id}
								onAddExpenseClick={() => {
									openAddExpenseModal(budget.id);
								}}
							/>
						);
					})}
					<UncategorizedBudgetCard onClick={openAddExpenseModal} />
					<TotalBudgetCard />
				</div>
			</Container>
			<AddBudgetModal
				show={showAddBudgetModal}
				handleClose={() => setShowAddBudgetModal(false)}
			/>
			<AddExpenseModal
				show={showExpenseModal}
				handleClose={() => setShowExpenseModal(false)}
				defaultBudgetId={expenseBudgetId}
			/>
		</>
	);
}

export default App;
