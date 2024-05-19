import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import GoogleAnalytics from '../components/GoogleAnalytics/';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GoogleAnalytics />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
