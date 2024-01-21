import {Card, CardBody, CardFooter, Button, IconButton, Typography} from "@material-tailwind/react";
import {XMarkIcon} from "@heroicons/react/16/solid";
import Player from "./Player";
import EmptyPlayer from "./EmptyPlayer";


export default function Court({no, court, onRemoveCourt, onEndGame}) {

    return <Card className="w-fit">
        <CardBody className="p-0">
            <div className="px-4 flex justify-between items-center">
                <Typography>No.{no}</Typography>
                <IconButton variant="text"
                            onClick={onRemoveCourt}>
                    <XMarkIcon className="h-5 w-5"></XMarkIcon>
                </IconButton>
            </div>

            <div className="grid grid-cols-2 grid-rows-7 bg-green-400 aspect-[6/9] w-80">
                <div
                    className="col-span-1 row-span-3 border-solid border-white h-100 border-2 flex flex-col items-center justify-center">
                    {
                        court.inGamePlayers[0]?.player
                            ? <Player player={court.inGamePlayers[0]?.player} color="white"/>
                            : <EmptyPlayer/>
                    }
                </div>
                <div
                    className="col-span-1 row-span-3 border-solid border-white h-100 border-2 flex items-center justify-center">
                    {
                        court.inGamePlayers[1]?.player
                            ? <Player player={court.inGamePlayers[1]?.player} color="white"/>
                            : <EmptyPlayer/>
                    }
                </div>

                <div className="col-span-2 border-solid border-white border-2"></div>

                <div
                    className="col-span-1 row-span-3 border-solid border-white h-100 border-2 flex items-center justify-center">
                    {
                        court.inGamePlayers[2]?.player
                            ? <Player player={court.inGamePlayers[2]?.player} color="white"/>
                            : <EmptyPlayer/>
                    }
                </div>
                <div
                    className="ccol-span-1 row-span-3 border-solid border-white h-100 border-2 flex items-center justify-center">
                    {
                        court.inGamePlayers[3]?.player
                            ? <Player player={court.inGamePlayers[3]?.player} color="white"/>
                            : <EmptyPlayer/>
                    }
                </div>
            </div>
        </CardBody>
        <CardFooter className="flex justify-center">
            <Button variant="outlined" color="green" onClick={onEndGame}>
                <Typography variant="h6">結束</Typography>
            </Button>
        </CardFooter>
    </Card>
}