import api from '../api';

export const userApi = {
  // Get current user profile
  getProfile: () => api.get('/auth/me'),

  // Update user profile
  updateProfile: (data) => api.put('/auth/users/profile', data),

  // Change password
  changePassword: (data) => api.put('/auth/users/password', data),

  // Update company information
  updateCompany: (data) => api.put('/auth/users/company', data),

  // Get user settings
  getSettings: () => api.get('/auth/users/settings'),

  // Update user settings
  updateSettings: (data) => api.put('/auth/users/settings', data),

  // Upload profile picture
  uploadProfilePicture: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/auth/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
}; 