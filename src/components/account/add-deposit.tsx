import React, { useState } from 'react';
import { useAddDepositMutation } from '../../mutations/deposits';

interface Props {
   user: number | undefined;
}

const AddDeposit: React.FC<Props> = ({ user }) => {
  const [depositAmount, setDepositAmount] = useState<number | string>('');
  const { addDeposit } = useAddDepositMutation();

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(depositAmount as string);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      setDepositAmount('');
      addDeposit.mutate({ amount: parsedAmount, userId: user });
    } else {
      alert('Veuillez entrer un montant valide.');
    }
  };

  return (
    <form onSubmit={handleDeposit} className="bg-gradient-to-r from-[#003366] to-[#004080] p-6 rounded-lg shadow-xl w-full max-w-md mx-auto">
      <label htmlFor="depositAmount" className="block text-sm font-medium text-white mb-2">Ajouter au solde personnel</label>
      <input
        type="number"
        id="depositAmount"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        className="w-full p-3 border border-transparent rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#003366] transition duration-300"
        placeholder="Entrez le montant"
        required
      />
      <button
        type="submit"
        className="mt-4 w-full bg-[#C0392B] text-white py-2 px-4 rounded-md shadow hover:bg-[#b03a2e] focus:outline-none focus:ring-2 focus:ring-[#C0392B] transition duration-300"
      >
        Ajouter
      </button>
    </form>
  );
};

export default AddDeposit;
