import {Button, Typography} from "@material-tailwind/react";
import Court from "../assets/court.svg";
import Rackets from "../assets/rackets.svg";
import Racket from "../assets/racket.svg";
import AddPlayerModal from "./AddPlayerModal";
import {useState} from "react";

export default function SessionInformation({className,session, onAddCourt, onGroup, onAddPlayer}) {
    const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false)

    const addPlayerModelHandler = () => {
        setIsAddPlayerOpen((prev) => !prev)
    }

    return <div className={"w-100 flex justify-between " + className} >
        {/*<div className="flex gap-4">*/}
        {/*    <Typography variant="text">總人數：{session.sessionPlayers.length}</Typography>*/}
        {/*    <Typography*/}
        {/*        variant="text">場上人數：{session.sessionPlayers.length - session.getNotInGamePlayers().length - session.getRestPlayers().length}</Typography>*/}
        {/*    <Typography variant="text">場地數量：{session.courts.length}</Typography>*/}
        {/*</div>        {/*<div className="flex gap-4">*/}
        {/*    <Typography variant="text">總人數：{session.sessionPlayers.length}</Typography>*/}
        {/*    <Typography*/}
        {/*        variant="text">場上人數：{session.sessionPlayers.length - session.getNotInGamePlayers().length - session.getRestPlayers().length}</Typography>*/}
        {/*    <Typography variant="text">場地數量：{session.courts.length}</Typography>*/}
        {/*</div>*/}

        <div className="flex gap-6">
            <Button className="flex flex-col justify-center items-center" onClick={onAddCourt} variant="outlined">
                <div className="h-8 w-8">
                    <img src={Court}/>
                </div>
                <Typography variant="h6">新增場地</Typography>
            </Button>

            <Button className="flex flex-col justify-center items-center" onClick={addPlayerModelHandler}
                    variant="outlined">
                <div className="h-8 w-8">
                    <img src={Racket}/>
                </div>
                <Typography variant="h6">新增成員</Typography>
            </Button>

            <Button className="flex flex-col justify-center items-center" onClick={onGroup} variant="outlined">
                <div className="h-8 w-8">
                    <img src={Rackets}/>
                </div>
                <Typography variant="h6">分組</Typography>
            </Button>
        </div>

        <AddPlayerModal
            isOpen={isAddPlayerOpen}
            handleOpen={addPlayerModelHandler}
            session={session}
            onAddPlayer={onAddPlayer}
        />
    </div>
}