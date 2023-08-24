import OAuthSignIn from "@/components/auth/oauthSignIn"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function signin() {
    return (
        <div className="container flex justify-center items-center max-w-lg h-[90vh]">
            <Card className="w-full">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">ChatBook</CardTitle>
                    <CardDescription>
                        Choose your preferred sign in method
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <OAuthSignIn />
                </CardContent>
            </Card>
        </div>
    )
}