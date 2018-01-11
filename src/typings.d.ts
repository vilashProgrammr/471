/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}

/* To enable import of jsion files */
declare module "*.json" {
    const value: any;
    export default value;
}
