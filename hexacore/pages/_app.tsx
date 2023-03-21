// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
import '../styles/global.css'
import { SSRProvider } from '@react-aria/ssr';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { library } from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons';


const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])

library.add(...iconList)

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <SSRProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </SSRProvider>
  );
}

export default MyApp;