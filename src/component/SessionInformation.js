import {Button, Typography} from "@material-tailwind/react";
import Court from "../assets/court.svg";
import Rackets from "../assets/rackets.svg";
import Racket from "../assets/racket.svg";
import Record from "../assets/record.svg";
import AddPlayerModal from "./AddPlayerModal";
import {useState} from "react";
import {Cog6ToothIcon} from "@heroicons/react/24/solid";
import SettingModal from "./SettingModal";
import RecordModal from "./RecordModal";

export default function SessionInformation({
                                               className,
                                               session,
                                               onAddCourt,
                                               onGroup,
                                               onAddPlayer,
                                               onGroupStrategyChange,
                                               onResetGamePlayCount
                                           }) {
    const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false)
    const [isSettingOpen, setIsSettingOpen] = useState(false)
    const [isRecordOpen, setIsRecordOpen] = useState(false)

    const addPlayerModelHandler = () => {
        setIsAddPlayerOpen((prev) => !prev)
    }

    const settingModelHandler = () => {
        setIsSettingOpen((prev) => !prev)
    }

    const recordModelHandler = () => {
        setIsRecordOpen((prev) => !prev)
    }

    return <div className={"w-100 flex justify-around " + className}>
        <div className="flex">
            <Button className="flex flex-col justify-center items-center" onClick={onAddCourt} variant="text">
                <div className="h-6 w-6">
                    <img alt="court" src={Court}/>
                </div>
                <Typography variant="h6">場地</Typography>
            </Button>

            <Button className="flex flex-col justify-center items-center" onClick={addPlayerModelHandler}
                    variant="text">
                <div className="h-6 w-6">
                    <img alt="member" src={Racket}/>
                </div>
                <Typography variant="h6">成員</Typography>
            </Button>

            <Button className="flex flex-col justify-center items-center" onClick={onGroup} variant="text">
                <div className="h-6 w-6">
                    <img alt="group" src={Rackets}/>
                </div>
                <Typography variant="h6">分組</Typography>
            </Button>

            <Button className="flex flex-col justify-center items-center" onClick={settingModelHandler}
                    variant="text">
                <div className="h-6 w-6">
                    <Cog6ToothIcon/>
                </div>
                <Typography variant="h6">設定</Typography>
            </Button>

            <Button className="flex flex-col justify-center items-center" onClick={recordModelHandler}
                    variant="text">
                <div className="h-6 w-6">
                    <img alt="record" src={Record}/>
                </div>
                <Typography variant="h6">記錄</Typography>
            </Button>
        </div>

        <AddPlayerModal
            isOpen={isAddPlayerOpen}
            handleOpen={addPlayerModelHandler}
            session={session}
            onAddPlayer={onAddPlayer}
        />

        <SettingModal
            isOpen={isSettingOpen}
            handleOpen={settingModelHandler}
            session={session}
            onGroupStrategyChange={onGroupStrategyChange}
        />

        <RecordModal
            isOpen={isRecordOpen}
            handleOpen={recordModelHandler}
            session={session}
            onResetGamePlayCount={onResetGamePlayCount}
        >
        </RecordModal>

    </div>
}