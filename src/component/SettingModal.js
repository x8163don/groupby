import {Dialog, DialogBody, Radio, Typography} from "@material-tailwind/react";

export default function SettingModal({isOpen, handleOpen, session, onGroupStrategyChange}) {
    const onGroupStrategyHandler = (e) => {
        onGroupStrategyChange(e.target.value);
    }

    return <Dialog open={isOpen} handler={handleOpen}>
        <DialogBody>
            <Typography>分組方式</Typography>
            <div className="flex flex-col">
                <Radio name="group"
                       value="PlayCountBaseGroup"
                       defaultChecked={session.groupStrategy.constructor.name === "PlayCountBaseGroup"}
                       onChange={onGroupStrategyHandler}
                       label="依上場次數"/>
                <Radio name="group"
                       value="GenderBaseGroup"
                       defaultChecked={session.groupStrategy.constructor.name === "GenderBaseGroup"}
                       onChange={onGroupStrategyHandler}
                       label="依照性別"/>
            </div>
        </DialogBody>
    </Dialog>
}