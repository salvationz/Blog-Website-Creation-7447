import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NewsletterSubscription } from '../../types';

interface NewsletterState {
  subscription: NewsletterSubscription;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: NewsletterState = {
  subscription: {
    email: '',
    subscribed: false
  },
  loading: false,
  error: null,
  message: null
};

export const subscribeToNewsletter = createAsyncThunk(
  'newsletter/subscribe',
  async (email: string) => {
    // Simulate API call
    return new Promise<NewsletterSubscription>((resolve, reject) => {
      setTimeout(() => {
        if (email && email.includes('@')) {
          resolve({
            email,
            subscribed: true,
            subscribedAt: new Date().toISOString()
          });
        } else {
          reject(new Error('Invalid email address'));
        }
      }, 1000);
    });
  }
);

export const unsubscribeFromNewsletter = createAsyncThunk(
  'newsletter/unsubscribe',
  async (email: string) => {
    // Simulate API call
    return new Promise<NewsletterSubscription>((resolve) => {
      setTimeout(() => {
        resolve({
          email,
          subscribed: false
        });
      }, 1000);
    });
  }
);

const newsletterSlice = createSlice({
  name: 'newsletter',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
    resetSubscription: (state) => {
      state.subscription = {
        email: '',
        subscribed: false
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Subscribe
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
        state.message = 'Successfully subscribed to newsletter!';
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to subscribe';
      })
      // Unsubscribe
      .addCase(unsubscribeFromNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unsubscribeFromNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
        state.message = 'Successfully unsubscribed from newsletter';
      })
      .addCase(unsubscribeFromNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to unsubscribe';
      });
  }
});

export const { clearMessage, resetSubscription } = newsletterSlice.actions;
export default newsletterSlice.reducer;