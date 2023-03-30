// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
import '../styles/global.css'
import { SSRProvider } from '@react-aria/ssr';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';


library.add( fas )

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