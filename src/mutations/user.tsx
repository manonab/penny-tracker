import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useApiMutation } from '../utils/api';
import { useToast } from '../components/toast';

export const useCreateCoupleMutation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const openToast = useToast();
  const queryClient = useQueryClient();

  const mutation = useApiMutation("couples",{
    key: 'create_couple',
    method: 'POST',
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['get_available_users']});
      queryClient.invalidateQueries({queryKey: ['get_couples']});
      setLoading(false);
      openToast({
        type: 'success',
        title: 'Couple créé',
        description: 'Le couple a été créé avec succès.',
      });
    },
    onError: (error: unknown) => {
      setLoading(false);
      console.error('Error creating couple:', error);

      openToast({
        type: 'error',
        title: 'Échec de la création du couple',
        description: 'Une erreur est survenue lors de la création du couple. Veuillez réessayer.',
      });
    },
  });

  return {
    createCouple: mutation.mutateAsync,
    isLoading: loading,
  };
};
