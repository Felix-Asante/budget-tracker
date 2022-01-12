import BudgetCard from "./BudgetCard";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetContext";
export default function TotalBudgetCard() {
	const { expenses, budgets } = useBudgets();

	const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
	const max = budgets.reduce((total, budget) => total + Number(budget.max), 0);

	if (max === 0) return null;
	return <BudgetCard gray name="Total" amount={amount} max={max} hideButtons />;
}
