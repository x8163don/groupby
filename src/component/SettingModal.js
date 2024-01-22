import {Dialog, DialogBody, Radio, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";

export default function SettingModal({isOpen, handleOpen, session, onGroupStrategyChange}) {
    const [curGroupStrategy, setCurGroupStrategy] = useState("")

    useEffect(() => {
        setCurGroupStrategy(session.groupStrategy?.constructor?.name)
    }, [session])

    const onGroupStrategyHandler = (e) => {
        onGroupStrategyChange(e.target.value);
    }

    return <Dialog open={isOpen} handler={handleOpen}>
        <DialogBody>
            <Typography>分組方式</Typography>
            <div className="flex flex-col">
                <Radio name="group" value="PlayCountBaseGroup" checked={curGroupStrategy === "PlayCountBaseGroup"} onChange={onGroupStrategyHandler} label="依上場次數"/>
                <Radio name="group" value="GenderBaseGroup" checked={curGroupStrategy === "GenderBaseGroup"} onChange={onGroupStrategyHandler} label="依照性別"/>
            </div>
        </DialogBody>
    </Dialog>
}