import "@/styles/globals.css";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/Slice";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    tasks: userReducer,
  },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
