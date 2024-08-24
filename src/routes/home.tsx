import React from 'react';
import { useAuth } from '../utils/context/auth-context';
import { GeneralBalance } from '../components/account/general-balance';
import { PersonnalBalance } from '../components/account/personnal-balance';
import ExpensesList from '../components/account/expenses-list';
import AddExpenseLondonStyle from '../components/account/add-expense';
import AddDeposit from '../components/account/add-deposit';
import { useGetUser } from '../queries/auth';
import { BiSolidCity } from 'react-icons/bi';

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { userDetails } = useGetUser(user?.user_id);

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-gray-800">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <BiSolidCity className="text-4xl text-[#003366] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#003366] mb-4">Bienvenue {userDetails?.username}</h1>
          <p className="text-lg text-gray-600">Gérez vos finances pour votre voyage à Londres.</p>
        <div className="flex justify-center my-6">
          <button
            onClick={logout}
            className="bg-[#FF6F61] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-[#FF4B4B] transition duration-300"
          >
            Déconnexion
          </button>
        </div>        
        </div>
        
        <div className="flex flex-col items-center gap-8 md:gap-12">
          <PersonnalBalance user={user?.user_id} />
          <GeneralBalance user={user?.user_id} />
          <AddDeposit user={user?.user_id} />
          <AddExpenseLondonStyle user={user?.user_id} />
          <ExpensesList user={user?.user_id} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
