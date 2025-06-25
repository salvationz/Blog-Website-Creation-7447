import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
    timestamp: number;
  }>;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  isSearchOpen: false,
  theme: 'light',
  notifications: []
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
      // Close mobile menu when opening search
      if (state.isSearchOpen) {
        state.isMobileMenuOpen = false;
      }
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    addNotification: (
      state,
      action: PayloadAction<{
        type: 'success' | 'error' | 'info';
        message: string;
      }>
    ) => {
      const notification = {
        id: Date.now().toString(),
        ...action.payload,
        timestamp: Date.now()
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    }
  }
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  toggleSearch,
  closeSearch,
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications
} = uiSlice.actions;

export default uiSlice.reducer;