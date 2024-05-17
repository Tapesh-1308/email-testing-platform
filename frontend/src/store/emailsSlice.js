import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';


export const fetchEmails = createAsyncThunk('emails/fetchEmails', async () => {
  const response = await fetch(BASE_URL + '/api/getAllEmails');
  const data = await response.json();
  return data;
});

const emailsSlice = createSlice({
  name: 'emails',
  initialState: {
    emails: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addEmail: (state, action) => {
      state.emails.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.emails = action.payload;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addEmail } = emailsSlice.actions;
export default emailsSlice.reducer;
