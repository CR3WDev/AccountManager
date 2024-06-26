import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/api/axios';
import { queryClient } from '@/api/queryClient';

export const useService = () => {
	const useGet = (key: string, path: string, enabled: boolean) => {
		return useQuery({
			queryKey: [key],
			queryFn: () => {
				return api.get(path);
			},

			enabled: enabled || false,
		});
	};

	const usePost = <T>(key: string, path: string) => {
		return useMutation({
			mutationKey: [key],
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [key],
				});
			},
			mutationFn: (data: T | any) => {
				return api.post<T | any>(path, data);
			},
		});
	};
	const useDelete = (key: string, path: string) => {
		return useMutation({
			mutationKey: [key],
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [key],
				});
			},
			mutationFn: () => {
				return api.delete(path);
			},
		});
	};
	const usePut = <T>(key: string, path: string) => {
		return useMutation({
			mutationKey: [key],
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [key],
				});
			},
			mutationFn: (data: T | any) => {
				return api.put(path, data);
			},
		});
	};

	return {
		usePost,
		useDelete,
		usePut,
		useGet,
	};
};
