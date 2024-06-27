// src/contexts/AssistantContext.tsx
import React, { createContext, useRef, useContext, ReactNode } from 'react';
import {AssistantAppState, createAssistant, createSmartappDebugger} from "@sberdevices/assistant-client";

type AssistantState = {
    assistantRef: React.MutableRefObject<ReturnType<typeof createAssistant> | null>;
    assistantStateRef: AssistantAppState;
    historyRef: React.MutableRefObject<string[]>;
    initializeAssistant: (getState: () => any) => ReturnType<typeof createAssistant>;
};

const AssistantContext = createContext<AssistantState | null>(null);

type AssistantProviderProps = {
    children: ReactNode;
};

export const AssistantProvider = ({ children }: AssistantProviderProps) => {
    const assistantRef = useRef<ReturnType<typeof createAssistant> | null>(null);
    const assistantStateRef = useRef<AssistantAppState>();
    const historyRef = useRef<string[]>([]);

    const initializeAssistant = (getState: () => any) => {
        if (!assistantRef.current) {
            assistantRef.current = createAssistant({ getState });
            // assistantRef.current = createSmartappDebugger({
            //     token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI3MmY0OTRmNC02YWY4LTRhNGUtYTgxMC1kNjZjOGQxYjdmYmQiLCJzdWIiOiIyMDY1ZDU0YjJkYjY1Njc4MjA0YWUwMjRmOWU4NjNhMDNlODA0MmExNWRmOTc3NWI0NmMzNzQ2MzllODM5Yjc3NTM5YmU5MjcwMDQyNjI5OCIsImlzcyI6IktFWU1BU1RFUiIsImV4cCI6MTcxOTMxMDQxMiwiYXVkIjoiVlBTIiwidXNyIjoiNzk1Zjk4YTItM2Q4Mi00YmUzLTgzZTYtOWVhNGMxZmQ1OTMyIiwiaWF0IjoxNzE5MjI0MDAyLCJzaWQiOiIyYTQ4MmQzNi03ODMwLTQzODUtOWM5Zi1mZGZlMWVjNGI3NDUifQ.PX1UDy8Y3Sq0tSJ1SdXAl1CsAGwBWCxmAj2T7GiXeX1d7THZ-cZI6Tpbtl51o-rJgFAy0UUDNxu6vPHtF7WAzcgN-fTRmXmE8fle5fxkuQqhJWt7zjp_WNkDW7EypENL5BgCVp34MSmxG8x_7Rs3mE6EJf9VSRVj1sQS4ZuT0Iuyt12AzFdCsdTRk-yrcIowFiBOQ3r5KB-ydV8RUhk7U1GKiyFZNU5mM2WkDAgVEqZTDgTUx6jaCW4YA00_jhsHahxq8wH9NAJnCNR5W1WDwdYNJZnF5guOidaUzbkXf8dOATPsS02vCNoNCyZkMpm4WUQZip8dl6i6HdNaNct_StJde6yQ0fvkzQHqvFzTMOvcDCPjdK4Rpt3qv2sIZqp0WGADbk-XGfOg_kG9-Lo9gFjtTkZ8rm_OduqrsQjvlDhkZA-TLS0jledxjM9XqnU6WfdfJKE2okDB3c3YxsOfYVdYjUvaCTjkDwoa4VIml3DPJeJ2P-I7poB-gW__szR-KEVkqd5qWeIF36H4irWyDx0JJkiCX-CBky4XZersCRYwPjIGwm7F5qDyGAzC057c2531yzYBrZaFsQZwlmpIlbqzRv1mkuBOqfsujR-Youhs1rCgV-zR9zZJJisu-EI5Ighwo5KiC5HO5HDBG2R10e2rFt-pfwB8usGWH8nGBCc',
            //     initPhrase: 'Открой рецепты полезных напитков',
            //     getState,
            //     nativePanel: {
            //         screenshotMode: false,
            //         tabIndex: -1,
            //     },
            // });
        }
        return assistantRef.current;
    };

    return (
        // @ts-ignore
        <AssistantContext.Provider value={{ assistantRef, initializeAssistant, assistantStateRef, historyRef }}>
            {children}
        </AssistantContext.Provider>
    );
};

export const useAssistant = () => useContext(AssistantContext);
