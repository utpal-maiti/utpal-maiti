React Toolkit, officially known as **Redux Toolkit**, is the recommended way to write Redux logic in modern React applications. It simplifies the process of managing global state and reduces boilerplate code. Here's a detailed breakdown of the core concepts and how to use them in a React app:

---

## 🔧 Core Concepts of Redux Toolkit (RTK)

### 1. **Store Configuration**

Redux Toolkit provides a `configureStore` function that simplifies store setup.

```js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

const store = configureStore({
	reducer: {
		counter: counterReducer,
	},
});
```

### 2. **Slices**

A **slice** is a collection of Redux reducer logic and actions for a single feature.

```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
	name: 'counter',
	initialState: { value: 0 },
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### 3. **Reducers**

Reducers are automatically created by `createSlice`. You export them and use them in the store.

### 4. **Actions**

Actions are also auto-generated from the `reducers` field in the slice.

### 5. **Async Thunks**

Redux Toolkit provides `createAsyncThunk` for handling async logic like API calls.

```js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
	const response = await fetch(`/api/user/${userId}`);
	return await response.json();
});
```

You handle the result in the slice using `extraReducers`.

```js
extraReducers: (builder) => {
	builder
		.addCase(fetchUser.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(fetchUser.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.user = action.payload;
		})
		.addCase(fetchUser.rejected, (state) => {
			state.status = 'failed';
		});
};
```

### 6. **Selectors**

Selectors are functions to extract specific data from the state.

```js
export const selectCount = (state) => state.counter.value;
```

### 7. **Hooks Integration**

Use `useSelector` and `useDispatch` from `react-redux` to interact with the store.

```js
import { useSelector, useDispatch } from 'react-redux';
import from './features/counter/counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <p>{count}</p>
    </div>
  );
};
```

---

## 🧠 Benefits of Redux Toolkit

- Reduces boilerplate
- Encourages best practices
- Built-in support for Immer (mutating state safely)
- Simplified async logic
- Better TypeScript support

---
