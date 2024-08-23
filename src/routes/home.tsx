import React, { useEffect, useState } from 'react';
import { useGetBalanceDetails } from '../queries/account';
import { useAuth } from '../utils/context/auth-context';

const HomePage: React.FC = () => {
  const  {user} = useAuth();
  const [generalBalance, setGeneralBalance] = useState(5000); 
    const [personalBalance, setPersonalBalance] = useState<number | null>(null);

  const { getBalanceDatas, isLoading, isError } = useGetBalanceDetails(user?.user_id);

  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Groceries', amount: 50 },
    { id: 2, description: 'Transport', amount: 20 },
    { id: 3, description: 'Utilities', amount: 100 },
  ]);
    useEffect(() => {
    if (user?.user_id && getBalanceDatas) {
      const fetchData = async () => {
        try {
          const balance = await getBalanceDatas();
          setPersonalBalance(balance);
        } catch (error) {
          console.error('Failed to fetch balance:', error);
        }
      };
      fetchData();
    }
  }, [user?.user_id, getBalanceDatas]);

  const [depositAmount, setDepositAmount] = useState('');

  const handleDeposit = (event: React.FormEvent) => {
    event.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    setPersonalBalance(getBalanceDatas + amount);
    setDepositAmount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-extrabold text-center mb-12">London Financial Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* General Account Balance */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Solde général du compte</h2>
            <p className="text-3xl font-semibold">{generalBalance.toFixed(2)}</p>
          </div>
          
          {/* Personal Account Balance */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Solde personnel</h2>
            <p className="text-3xl font-semibold">{personalBalance?.toFixed(2)}</p>
            <form onSubmit={handleDeposit} className="mt-6">
              <label htmlFor="depositAmount" className="block text-sm font-medium mb-2">Add to Personal Balance</label>
              <input
                type="number"
                id="depositAmount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter amount"
                required
              />
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Deposit
              </button>
            </form>
          </div>
          
          {/* Expenses List */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
            <ul className="space-y-2">
              {expenses.map((expense) => (
                <li key={expense.id} className="flex justify-between">
                  <span>{expense.description}</span>
                  <span className="font-semibold">${expense.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;
