"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icon, Icons } from "@/components/icon";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const oauthProviders = [
    { name: "Google", strategy: "google", icon: "google" },
    { name: "Github", strategy: "gitHub", icon: "gitHub" },
] as {
    name: string,
    strategy: string,
    icon: Icon
}[];

const OAuthSignIn = () => {
    const [isLoading, setIsLoading] = React.useState<string | null>(null)

    async function signInWithOauth(provider: string) {
        try {
            setIsLoading(provider);
            await signIn(provider, {
                callbackUrl: "http://localhost:3000/",
                redirect: false
            });

        } catch (error) {
            setIsLoading(null);
            toast.error("Something went wrong. Please try again later.")
        } finally {
            setIsLoading(null);
        }
    }

    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            {oauthProviders.map((provider) => {
                const Icon = Icons[provider.icon];
                return (
                    <Button
                        key={provider.strategy}
                        aria-label={`Sign in with ${provider.name}`}
                        variant="outline"
                        onClick={() => signInWithOauth(provider.strategy)}
                        disabled={isLoading !== null}
                    >
                        {isLoading === provider.strategy ? (
                            <Icons.spinner
                                className="mr-2 h-4 w-4 animate-spin"
                                aria-hidden="true"
                            />
                        ) : (
                            <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                        )}
                        {provider.name}
                    </Button>
                )
            })}
        </div>
    );
}

export default OAuthSignIn