import {Dialog, DialogBody, Radio, Typography} from "@material-tailwind/react";

export default function SettingModal({isOpen, handleOpen, session, onGroupStrategyChange}) {
    const onGroupStrategyHandler = (strategyName) => {
        onGroupStrategyChange(strategyName);
    }

    return <Dialog open={isOpen} handler={handleOpen}>
        <DialogBody>
            <Typography>分組方式</Typography>
            <div className="flex flex-col">
                <Radio name="group"
                       defaultChecked={session.groupStrategy.constructor.name === "PlayCountBaseGroup"}
                       onClick={() => onGroupStrategyHandler("PlayCountBaseGroup")}
                       label="依上場次數"/>
                <Radio name="group"
                       defaultChecked={session.groupStrategy.constructor.name === "GenderBaseGroup"}
                       onClick={() => onGroupStrategyHandler("GenderBaseGroup")}
                       label="男女混雙"/>
                <Radio name="group"
                       defaultChecked={session.groupStrategy.constructor.name === "RandomBaseGroup"}
                       onClick={() => onGroupStrategyHandler("RandomBaseGroup")}
                       label="完全隨機"/>
            </div>
        </DialogBody>
    </Dialog>
}