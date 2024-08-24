import React, { useState } from 'react';
import { useGetPersonnalExpenses } from '../../queries/expenses';
import { ExpenseType } from '../../types/expenses';
import { useDeleteExpenseMutation } from '../../mutations/expenses';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Pour l'accessibilité

interface ExpensesListProps {
  user: number | undefined;
}

const ExpensesList: React.FC<ExpensesListProps> = ({ user }) => {
  const { expenseDetails, isLoading } = useGetPersonnalExpenses(user);
  const { updateExpenses } = useDeleteExpenseMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);

  if (isLoading) {
    return <p>Chargement des dépenses...</p>;
  }

  const handleDelete = (id: number) => {
    setSelectedExpenseId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedExpenseId !== null) {
      updateExpenses(selectedExpenseId);
    }
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
                  <tr
                    key={expense.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleDelete(expense.id)}
                  >
                    <td className="px-6 py-4 border-b border-[#E0E0E0] text-gray-800">{expense.description}</td>
                    <td className="px-6 py-4 border-b border-[#E0E0E0] text-gray-800">{expense.amount} €</td>
                    <td className="px-6 py-4 border-b border-[#E0E0E0] text-gray-800">{new Date(expense.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelDelete}
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        bodyOpenClassName=""
      >
        <div className="text-center bg-white py-4 rounded-lg max-w-md mx-auto w-full h-1/4 max-h-full overflow-auto">
          <h2 className="text-2xl font-bold text-[#003366] mb-4">Confirmer la Suppression</h2>
          <p className="text-gray-700 mb-4">Êtes-vous sûr de vouloir supprimer cette dépense ?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={confirmDelete}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Supprimer
            </button>
            <button
              onClick={cancelDelete}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ExpensesList;
