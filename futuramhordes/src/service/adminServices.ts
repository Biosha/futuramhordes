import { http } from '@/utils';

export const AdminService = {
	getPannel(): Promise<Array<any>> {
		return http()
			.get(`/admin/getpannel`)
			.then(res => Promise.resolve(res.data))
			.catch(err => Promise.reject(err));
	}
};
