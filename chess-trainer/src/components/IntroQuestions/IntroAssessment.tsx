import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React, { useState } from 'react'

const IntroAssessment: React.FC = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
            <Button variant="outlined" className="nav-button border-green-900 border-2 text-gray-600 focus:text-gray-400 focus:bg-blue-700 hover:text-gray-400 px-12 text-3xl font-sans font-normal tracking-wider py-7 rounded  hover:bg-blue-700 flex items-center">
                hello
            </Button>
            <Button onClick={handleOpen} variant="gradient" className='font-mono text-lg tracking-wider'>
                Open Dialog
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody>
                    The key to more success is to have a lot of pillows. Put it this way,
                    it took me twenty five years to get these plants, twenty five years of
                    blood sweat and tears, and I&apos;m never giving up, I&apos;m just
                    getting started. I&apos;m up to something. Fan luv.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default IntroAssessment;