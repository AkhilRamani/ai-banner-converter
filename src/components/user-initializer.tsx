"use client";

import { useConvexAuth, useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";

export function UserInitializer() {
    const { isAuthenticated } = useConvexAuth();
    const getOrCreateUser = useMutation(api.functions.users.getOrCreateUser);

    useEffect(() => {
        if (isAuthenticated) {
            getOrCreateUser({});
        }
    }, [isAuthenticated, getOrCreateUser]);

    return null;
}
