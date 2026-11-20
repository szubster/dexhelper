export interface ContextDefinition {
  /** The name of the context variable (e.g., 'MyContext') */
  name: string;
  /** The file path where the context is defined */
  filePath: string;
  /** The generic type applied to createContext, if any */
  typeArg?: string;
  /** The default value passed to createContext, if any */
  defaultValue?: string;
}

export interface ContextProviderExport {
  /** The name of the exported Provider component */
  name: string;
  /** The name of the underlying context variable it provides */
  contextName: string;
  /** The file path where the provider is exported */
  filePath: string;
}
