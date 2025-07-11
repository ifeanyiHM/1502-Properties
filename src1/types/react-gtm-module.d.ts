declare module "react-gtm-module" {
  interface TagManagerArgs {
    gtmId: string;
    dataLayerName?: string;
    auth?: string;
    preview?: string;
    dataLayer?: Record<string, unknown>;
  }

  const ReactGTM: {
    initialize: (args: TagManagerArgs) => void;
    dataLayer: {
      args: Record<string, unknown>;
    };
  };

  export default ReactGTM;
}
