"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { InsufficientCreditsDialog } from "@/components/shared/insufficient-credits-dialog";

interface CreditContextType {
    checkCredits: (required?: number) => boolean;
}

const CreditContext = createContext<CreditContextType | null>(null);

export function CreditProvider({ children }: { children: ReactNode }) {
    const [showDialog, setShowDialog] = useState(false);
    const [requiredCredits, setRequiredCredits] = useState(1);
    const userCredits = useQuery(api.functions.users.getUserCredits);

    const checkCredits = (required: number = 1) => {
        if (!userCredits || userCredits.creditsRemaining < required) {
            setRequiredCredits(required);
            setShowDialog(true);
            return false;
        }
        return true;
    };

    return (
        <CreditContext.Provider value={{ checkCredits }}>
            {children}
            <InsufficientCreditsDialog
                open={showDialog}
                onOpenChange={setShowDialog}
                creditsRemaining={userCredits?.creditsRemaining ?? 0}
                creditsNeeded={requiredCredits}
            />
        </CreditContext.Provider>
    );
}

export const useCreditCheck = () => {
    const context = useContext(CreditContext);
    if (!context) {
        throw new Error("useCreditCheck must be used within a CreditProvider");
    }
    return context;
};
