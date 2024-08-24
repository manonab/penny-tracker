import React, { useState } from 'react';
import { useAddExpenseMutation } from '../../mutations/expenses';
import { useToast } from '../toast';
import { FaMoneyBillWave } from 'react-icons/fa';

interface AddExpenseFormProps {
  user: number | undefined;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ user }) => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number | string>('');
  const [date, setDate] = useState<string>('');
  const { addExpense, isLoading } = useAddExpenseMutation();
  const openToast = useToast();

  const handleAddExpense = () => {
    const parsedAmount = parseFloat(amount as string);
    if (description && !isNaN(parsedAmount) && date && user) {
      addExpense.mutate({ 
        description: description, 
        amount: parsedAmount, 
        user: user,
        createdAt: date 
      });
      setDescription('');
      setAmount('');
      setDate('');
    } else {
      openToast({
        type: "error",
        title: "Demande annulée",
        description: "Veuillez entrer une description, un montant valide et une date.",
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#003366] to-[#004080] p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <FaMoneyBillWave className="text-white text-3xl mr-3" />
        <h3 className="text-2xl font-bold text-white">Ajouter une Dépense</h3>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-white mb-1">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-transparent rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#003366] transition duration-300"
          placeholder="Entrez la description"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-white mb-1">Montant</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-transparent rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#004080] transition duration-300"
          placeholder="Entrez le montant"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-white mb-1">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-transparent rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#003366] transition duration-300"
        />
      </div>
      <button
        onClick={handleAddExpense}
        className={`w-full p-3 rounded-md ${isLoading ? 'bg-gray-400' : 'bg-[#C0392B] text-white'} hover:bg-[#b03a2e] focus:outline-none focus:ring-2 focus:ring-[#C0392B] transition duration-300`}
        disabled={isLoading}
      >
        {isLoading ? 'Ajout en cours...' : 'Ajouter'}
      </button>
    </div>
  );
};

export default AddExpenseForm;
