import { useGetBalanceGeneral } from "../../queries/account";
import { FaDollarSign } from 'react-icons/fa';

interface Props {
  user: number | undefined;
}

export const GeneralBalance = ({ user }: Props) => {
  const { getBalanceGeneralDatas } = useGetBalanceGeneral(user);

  return (
    <div className="bg-gradient-to-r from-[#003366] to-[#004080] p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out mx-6 max-w-md w-full">
      <div className="flex items-center mb-4">
        <FaDollarSign className="text-white text-3xl mr-2" />
        <h2 className="text-2xl font-bold text-white">Solde général du compte</h2>
      </div>
      <p className="text-4xl font-bold text-white">
        {getBalanceGeneralDatas?.toFixed(2)} €
      </p>
    </div>
  );
};
