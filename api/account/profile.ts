// api/profile.ts
import axiosInstance from '@/api/axiosInstance';

export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/account/profile/');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
