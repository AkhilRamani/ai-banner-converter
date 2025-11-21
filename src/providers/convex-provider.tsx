// "use client";

// import { ReactNode, useCallback, useRef } from "react";
// import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
// import { AuthKitProvider, useAuth, useAccessToken } from "@workos-inc/authkit-nextjs/components";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!, {
//   expectAuth: true,
// });

// export function ConvexClientProvider({ children }: { children: ReactNode }) {
//   return (
//     <AuthKitProvider>
//       <ConvexProviderWithAuth client={convex} useAuth={useAuthFromAuthKit}>
//         {children}
//       </ConvexProviderWithAuth>
//     </AuthKitProvider>
//   );
// }

// function useAuthFromAuthKit() {
//   const { user, loading: isLoading } = useAuth({ ensureSignedIn: true });
//   const { accessToken, loading: tokenLoading, error: tokenError } = useAccessToken();
//   const loading = (isLoading ?? false) || (tokenLoading ?? false);
//   const authenticated = !!user && !!accessToken && !loading;

//   const stableAccessToken = useRef<string | null>(null);
//   if (accessToken && !tokenError) {
//     stableAccessToken.current = accessToken;
//   }

//   const fetchAccessToken = useCallback(async () => {
//     if (stableAccessToken.current && !tokenError) {
//       return stableAccessToken.current;
//     }
//     return null;
//   }, [tokenError]);

//   return {
//     isLoading: loading,
//     isAuthenticated: authenticated,
//     fetchAccessToken,
//   };
// }

"use client";

import { ReactNode, useCallback, useState } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth } from "convex/react";
import { AuthKitProvider, useAuth, useAccessToken } from "@workos-inc/authkit-nextjs/components";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [convex] = useState(() => {
    return new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  });
  return (
    <AuthKitProvider>
      <ConvexProviderWithAuth client={convex} useAuth={useAuthFromAuthKit}>
        {children}
      </ConvexProviderWithAuth>
    </AuthKitProvider>
  );
}

function useAuthFromAuthKit() {
  const { user, loading: isLoading } = useAuth();
  const { getAccessToken, refresh } = useAccessToken();

  const isAuthenticated = !!user;

  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken?: boolean } = {}): Promise<string | null> => {
      if (!user) {
        return null;
      }

      try {
        if (forceRefreshToken) {
          return (await refresh()) ?? null;
        }

        return (await getAccessToken()) ?? null;
      } catch (error) {
        console.error("Failed to get access token:", error);
        return null;
      }
    },
    [user, refresh, getAccessToken]
  );

  return {
    isLoading,
    isAuthenticated,
    fetchAccessToken,
  };
}
