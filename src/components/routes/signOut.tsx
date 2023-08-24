import React, { FC } from 'react'
import { Button } from '../ui/button'
import { Icons } from '../icon'
import { signOut } from 'next-auth/react'

interface SignoutProps { }

const Signout: FC<SignoutProps> = ({ }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function handleSignOut() {
        setIsLoading(true)
        await signOut()
        setIsLoading(false)
    }

    return (
        <Button
            disabled={isLoading}
            className="hover:bg-muted hover:text-accent-foreground text-muted-foreground"
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
        >
            {isLoading ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
                <Icons.logout
                    className="h-5 w-5"
                    aria-hidden="true"
                />
            )}
            <span className="sr-only">logout</span>
        </Button>
    )
}

export default Signout