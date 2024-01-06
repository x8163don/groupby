import {Card, CardHeader, CardBody, CardFooter, Button, IconButton, Typography} from "@material-tailwind/react";
import {XMarkIcon} from "@heroicons/react/16/solid";

export default function CourtView({no, court, onRemoveCourt, onEndGame}) {

    return <Card className="w-fit">
        <CardHeader floated={false}
                    className="flex justify-between items-center">
        </CardHeader>
        <CardBody className="p-0">
            <div className="px-4 flex justify-between items-center">
                <Typography>No.{no}</Typography>
                <IconButton variant="text"
                            onClick={onRemoveCourt}>
                    <XMarkIcon className="h-5 w-5"></XMarkIcon>
                </IconButton>
            </div>

            <div className="grid grid-cols-2 gird-rows-3 bg-green-400 aspect-[6/9] w-72">
                <div className="col-span-1 border-solid border-white border-2 flex items-center justify-center">
                    {court.inGamePlayers[0]?.player?.id}
                </div>
                <div className="col-span-1 border-solid border-white border-2 flex items-center justify-center">
                    {court.inGamePlayers[1]?.player?.id}
                </div>
                <div className="col-span-2 border-solid border-white border-2"></div>
                <div className="col-span-1 border-solid border-white border-2 flex items-center justify-center">
                    {court.inGamePlayers[2]?.player?.id}
                </div>
                <div className="col-span-1 border-solid border-white border-2 flex items-center justify-center">
                    {court.inGamePlayers[3]?.player?.id}
                </div>
            </div>
        </CardBody>
        <CardFooter>
            <Button onClick={onEndGame}>EndGame</Button>
        </CardFooter>
    </Card>
}