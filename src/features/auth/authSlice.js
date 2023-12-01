// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, googleProvider, signInWithPopup } from '../../config/firebase';

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user
  } catch (error) {
    console.error('Error signing in with Google:', error.message);
  }
});

export const signInWithEmailPassword = createAsyncThunk(
  'auth/signInWithEmailPassword',
  async ({ email, password }) => {
    const result = await auth.signInWithEmailAndPassword(email, password);
    return result.user;
  });

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await auth.signOut();
});

const initialState = {
  user: null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload
      state.isLoading = false

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          displayName: action.payload.displayName,
          email: action.payload.email,
          uid: action.payload.uid,
          photoURL: action.payload.photoURL
        }
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signInWithEmailPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInWithEmailPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signInWithEmailPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer;
