import { useEffect, useState } from 'react';
import bowser from 'bowser';

interface EngineConfig {
  [engineName: string]: { [key: string]: any };
}

interface MappedConfig {
  [engineName: string]: { [key: string]: any };
}

/**
 * Custom React hook to detect the browser rendering engine and return the corresponding configuration from a provided object.
 * @param engineConfig - Object with lower case property names mapped to configurations based on the detected rendering engine.
 *   The `engineConfig` object should have the following properties:
 *   - Property names: Lower case names of the supported rendering engines (e.g., "blink", "gecko").
 *   - Property values: Configurations corresponding to the detected rendering engine.
 *   - `default` property (optional): A fallback configuration to use when the detected rendering engine doesn't have a matching configuration.
 * @returns The configuration mapped to the detected rendering engine, or the fallback configuration if no match is found.
 */
export default function useRenderingEngineConfig(engineConfig: EngineConfig) {
  const [mappedConfig, setMappedConfig] = useState<MappedConfig | null>(null);

  useEffect(() => {
    const detectedEngine = bowser.getParser(window.navigator.userAgent).getEngine();
    if (detectedEngine?.name) {
      const detectedEngineName = detectedEngine.name.toLowerCase();

      if (detectedEngineName in engineConfig) {
        setMappedConfig(engineConfig[detectedEngineName]);
      } else if ('default' in engineConfig) {
        setMappedConfig(engineConfig.default);
      }
    }
  }, [engineConfig]);

  return mappedConfig;
}
