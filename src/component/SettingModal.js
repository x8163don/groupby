import {Dialog, DialogBody, Radio, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";

export default function SettingModal({isOpen, handleOpen, session, onGroupStrategyChange}) {
    const [curGroupStrategy, setCurGroupStrategy] = useState("")

    useEffect(() => {
        setCurGroupStrategy(session.groupStrategy?.constructor?.name)
    }, [session])

    return <Dialog open={isOpen} handler={handleOpen}>
        <DialogBody>
            <Typography>分組方式</Typography>
            <div className="flex flex-col">
            <Radio name="group" checked={curGroupStrategy === "PlayCountBaseGroup"} label="依上場次數" onClick={() => {
                onGroupStrategyChange("PlayCountBaseGroup")
            }}/>
            <Radio name="group" checked={curGroupStrategy === "GenderBaseGroup"} label="依照性別" onClick={() => {
                onGroupStrategyChange("GenderBaseGroup")
            }}/>
            </div>
        </DialogBody>
    </Dialog>
}