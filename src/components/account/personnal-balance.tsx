import { FaDollarSign } from 'react-icons/fa';
import { RxPencil1 } from "react-icons/rx";
import { useGetBalanceDetails } from "../../queries/account";

interface Props {
  user: number | undefined;
}

export const PersonnalBalance = ({ user }: Props) => {
  const { getBalanceDatas } = useGetBalanceDetails(user);

  return (
    <div className="bg-gradient-to-r from-[#003366] to-[#004080] p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out mx-6 max-w-md w-full">
      <div className="flex items-center mb-4">
        <FaDollarSign className="text-white text-3xl mr-2" />
        <h2 className="text-2xl font-bold text-white">Solde personnel du compte</h2>
        <button className="ml-2 text-white hover:text-gray-200">
          <RxPencil1 className="text-2xl" />
        </button>
      </div>
      <p className="text-4xl font-bold text-white">
        {getBalanceDatas?.toFixed(2)} €
      </p>
    </div>
  );
};
