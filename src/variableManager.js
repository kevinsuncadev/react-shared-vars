const variableList = {};
const callbackList = new Map();

export const VariableManager = {
    get(name, defaultValue) {
        return variableList[name] !== undefined ? variableList[name] : defaultValue;
    },
    set(name, value){
        if(variableList[name] === value) return;
        variableList[name] = value;
        const callbacks = callbackList.get(name);
        if(callbacks){
            callbacks.forEach((callback)=>callback());
        }
    },
    register(name, callback, defaultValue){
        if(variableList[name] === undefined && defaultValue !== undefined){
            variableList[name] = defaultValue;
        }
        if(!callbackList.has(name)){
            callbackList.set(name, new Set());
        }
        callbackList.get(name).add(callback);
        
        return () => {
            const currentCallBacks = callbackList.get(name);
            if(!currentCallBacks) return;
            currentCallBacks.delete(callback);
     
            queueMicrotask(() => {
                const latestCallbacks = callbackList.get(name);
                if (latestCallbacks && latestCallbacks.size === 0) {
                    delete variableList[name];
                    callbackList.delete(name);
                }
            });
    };
}
}