import React, { useState } from 'react';

const HomePage: React.FC = () => {
  const [balance, setBalance] = useState(1000);
  const [depositAmount, setDepositAmount] = useState('');

  const handleDeposit = (event: React.FormEvent) => {
    event.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Veuillez entrer un montant valide.');
      return;
    }
    setBalance(balance + amount);
    setDepositAmount('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Welcome to Your Dashboard</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-600">Your Balance</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">${balance.toFixed(2)}</p>
        </div>

        <form onSubmit={handleDeposit} className="space-y-4 mb-8">
          <div>
            <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700">Add Deposit</label>
            <input
              type="number"
              id="depositAmount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Deposit
          </button>
        </form>

        <div className="flex justify-center">
          <a href="/login" className="text-blue-500 hover:underline">Go to Login Page</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
