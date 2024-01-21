import {Typography, Avatar} from "@material-tailwind/react";
import Boy from "../assets/boy.svg";
import Girl from "../assets/girl.svg";

export default function Player({player, color, isShowStatus = false, isRest = false}) {
    return <div className="h-fit w-fit flex flex-col items-center">
        <Avatar size="lg"
                src={player.gender === "male" ? Boy : Girl}
                withBorder={isShowStatus}
                color={isRest ? "red" : "green"}
                variant="circular"
        />
        <Typography variant="h6" color={color}>{player.name}</Typography>
    </div>
}