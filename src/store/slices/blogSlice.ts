import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BlogPost, Category } from '../../types';
import { blogPosts as initialBlogPosts } from '../../data/blogPosts';

interface BlogState {
  posts: BlogPost[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
  currentPost: BlogPost | null;
}

const initialState: BlogState = {
  posts: initialBlogPosts,
  categories: [
    { id: '1', name: 'Technology', slug: 'technology', description: 'Latest tech trends and insights', color: 'blue' },
    { id: '2', name: 'Design', slug: 'design', description: 'Design principles and inspiration', color: 'purple' },
    { id: '3', name: 'Lifestyle', slug: 'lifestyle', description: 'Life tips and personal growth', color: 'green' },
    { id: '4', name: 'Travel', slug: 'travel', description: 'Travel guides and experiences', color: 'orange' }
  ],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: null,
  currentPost: null
};

// Async thunks
export const fetchPosts = createAsyncThunk(
  'blog/fetchPosts',
  async () => {
    // Simulate API call
    return new Promise<BlogPost[]>((resolve) => {
      setTimeout(() => resolve(initialBlogPosts), 1000);
    });
  }
);

export const fetchPostById = createAsyncThunk(
  'blog/fetchPostById',
  async (id: number) => {
    // Simulate API call
    return new Promise<BlogPost | null>((resolve) => {
      setTimeout(() => {
        const post = initialBlogPosts.find(p => p.id === id) || null;
        resolve(post);
      }, 500);
    });
  }
);

export const likePost = createAsyncThunk(
  'blog/likePost',
  async (postId: number) => {
    // Simulate API call
    return new Promise<{ postId: number; likes: number }>((resolve) => {
      setTimeout(() => {
        resolve({ postId, likes: Math.floor(Math.random() * 100) + 1 });
      }, 300);
    });
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    toggleBookmark: (state, action: PayloadAction<number>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.bookmarked = !post.bookmarked;
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      // Fetch post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch post';
      })
      // Like post
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
          post.likes = action.payload.likes;
        }
      });
  }
});

export const { setSearchQuery, setSelectedCategory, toggleBookmark, clearError } = blogSlice.actions;
export default blogSlice.reducer;