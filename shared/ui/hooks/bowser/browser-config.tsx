import { useEffect, useState } from 'react';
import bowser from 'bowser';

interface BrowserConfig {
  [browserName: string]: { [key: string]: any };
}

/**
 * Custom React hook to detect the browser and return the detected browser and its corresponding configuration from a provided object.
 * @param browserConfig - Object with lower case property names mapped to configurations based on the detected browser.
 *   The `browserConfig` object should have the following properties:
 *   - Property names: Lower case names of the supported browsers (e.g., "firefox", "chrome").
 *   - Property values: Configurations corresponding to the detected browser.
 *   - `default` property (optional): A fallback configuration to use when the detected browser doesn't have a matching configuration.
 * @returns An object containing the detected browser in lower case and its corresponding configuration.
 * - browserConfig: The provided object with lower case property names mapped to configurations based on the detected browser.
 * - browser: The detected browser name in lower case.
 */

export default function useBrowserConfig(browserConfig: BrowserConfig) {
  const [browserType, setBrowserType] = useState<string | null>(null);

  useEffect(() => {
    const detectedBrowser = bowser.getParser(window.navigator.userAgent).getBrowser();
    if (detectedBrowser?.name) {
      const detectedBrowserName = detectedBrowser.name.toLowerCase();

      if (detectedBrowserName in browserConfig) {
        setBrowserType(detectedBrowserName);
      } else if ('default' in browserConfig) {
        setBrowserType(null);
      }
    }
  }, [browserConfig]);

  const mappedConfig = browserType
    ? browserConfig[browserType]
    : browserConfig.default || null;

  return {
    browserConfig: mappedConfig,
    browser: browserType,
  };
}
