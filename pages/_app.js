import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

import "react-datepicker/dist/react-datepicker.css";
import "styles/react-datepicker.css";
import "mapbox-gl/dist/mapbox-gl.css";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
