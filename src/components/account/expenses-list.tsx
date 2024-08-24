import React from 'react';
import { useGetPersonnalExpenses } from '../../queries/expenses';
import { ExpenseType } from '../../types/expenses';

interface ExpensesListProps {
   user: number | undefined;
}

const ExpensesList: React.FC<ExpensesListProps> = ({ user }) => {
  const { expenseDetails, isLoading } = useGetPersonnalExpenses(user);

  if (isLoading) {
    return <p>Chargement des dépenses...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-[#003366] mb-4">Mes dernières Dépenses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-[#003366] text-left leading-4 text-[#003366]">Intitulé</th>
              <th className="px-6 py-3 border-b-2 border-[#003366] text-left leading-4 text-[#003366]">Montant</th>
              <th className="px-6 py-3 border-b-2 border-[#003366] text-left leading-4 text-[#003366]">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenseDetails?.sort((a: ExpenseType, b: ExpenseType) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((expense: ExpenseType) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 border-b border-[#E0E0E0] text-gray-800">{expense.description}</td>
                  <td className="px-6 py-4 border-b border-[#E0E0E0] text-gray-800">{expense.amount} €</td>
                  <td className="px-6 py-4 border-b border-[#E0E0E0] text-gray-800">{new Date(expense.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesList;
