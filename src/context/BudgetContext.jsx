import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
const BudgetsContext = React.createContext();

export function useBudgets() {
	return useContext(BudgetsContext);
}

export const BudgetProvider = ({ children }) => {
	const [budgets, setBudgets] = useState([]);
	const [expenses, setExpenses] = useState([]);

	function getBudgetExpenses(id) {
		return expenses.filter((expense) => expense.budgetId === id);
	}

	function addExpense({ description, amount, budgetId }) {
		setExpenses((prevExpenses) => {
			return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
		});
	}

	function addBudget({ name, max }) {
		setBudgets((prevBudgets) => {
			if (prevBudgets.find((budget) => budget.name === name)) {
				return prevBudgets;
			}
			return [...prevBudgets, { id: uuidV4(), name, max }];
		});
	}

	function deleteBudget({ id }) {
		setBudgets((prevBudgets) => {
			return prevBudgets.filter((budget) => budget.id !== id);
		});
	}
	function deleteExpense({ id }) {
		setExpenses((prevExpenses) => {
			return prevExpenses.filter((expense) => expense.id !== id);
		});
	}

	const contextValues = {
		budgets,
		expenses,
		getBudgetExpenses,
		addExpense,
		addBudget,
		deleteBudget,
		deleteExpense,
	};
	return (
		<BudgetsContext.Provider value={contextValues}>
			{children}
		</BudgetsContext.Provider>
	);
};
