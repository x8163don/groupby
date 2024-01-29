import {Typography} from "@material-tailwind/react";
import Boy from "../assets/boy.svg";
import Girl from "../assets/girl.svg";

export default function Player({player, color, isRest = false}) {
    return <div className="h-fit w-fit flex flex-col items-center">
        <div
            className="relative max-w-xs overflow-hidden bg-cover bg-[50%] bg-no-repeat rounded-full">
            <img
                alt={player.name}
                src={player.gender === "male" ? Boy : Girl}
                className="h-12 w-12"/>
            {
                isRest && <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-50"></div>
            }
        </div>
        <Typography variant="h6" color={color}>{player.name}</Typography>
    </div>
}