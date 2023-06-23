function Singleton<T extends new (...args: any[]) => any>(Class: T): T {
    let instance: InstanceType<T> | null = null;

    return class extends Class {
        constructor(...args: any[]) {
            if (instance !== null) return instance;
            super(...args);
            instance = this as InstanceType<T>;
        }
    };
}