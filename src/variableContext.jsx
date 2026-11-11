import React, { createContext, useContext, useSyncExternalStore, useCallback } from 'react';
import { VariableManager } from './variableManager.js';

const VariableContext = createContext(VariableManager);

export function VariableProvider({ children}) {
    return (
        <VariableContext.Provider value = {VariableManager}>
            {children}
        </VariableContext.Provider>    
    );    
}

export function useVariable(name, defaultValue) {
    const manager = useContext(VariableContext);

    const subscribe = useCallback(
        (callback) => manager.register(name, callback, defaultValue),
        [manager, name]
    );

    const value = useSyncExternalStore(
        subscribe,
        () => manager.get(name, defaultValue),
        () => defaultValue 
    );

    const setVariable = useCallback(
        (newValue) => manager.set(name, newValue),
        [manager, name]
    );
    return [value, setVariable];
}