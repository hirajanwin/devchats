import React, { FC } from 'react'
import { Card } from '../ui/card'
import { Lock } from 'lucide-react'
import { Button } from '../ui/button'

interface singInBannerProps {

}
const SingInBanner: FC<singInBannerProps> = ({ }) => {
    return (
        <div className="fixed inset-x-0 bottom-0 p-4 max-w-xl mx-auto">
            <Card className="rounded-lg px-4 py-3 text-white shadow-lg">
                <p className="md:flex-row flex-col flex  justify-between items-center text-sm font-medium tracking-normal text-center md:text-left">
                    Login to see more awesome stuff on DevChats!
                    {/* <a href="#" className="inline-block underline">
                        Check out this new course!
                    </a> */}
                    <Button className='text-md w-full sm:w-auto  mt-3 md:mt-0' size={'sm'}>Login</Button>
                </p>
            </Card>
        </div>
    )
}

export default SingInBanner