import {default as PlayerView} from "./Player";

export default function PlayerArea({className, session, onPlayerRest}) {

    return <div className={"flex justify-start items-center gap-4 " + className}>
        {
            session.getNotInGamePlayers().map((player, i) => {
                return <div key={player.id} onClick={() => onPlayerRest(player.id)}
                            className="flex flex-col justify-center items-center cursor-pointer min-w-14">
                    <PlayerView player={player}/>
                </div>
            })
        }
        {
            session.getRestPlayers().map((player, i) => {
                return <div key={player.id} onClick={() => onPlayerRest(player.id)}
                            className="flex flex-col justify-center items-center cursor-pointer min-w-14">
                    <PlayerView isRest={true} player={player}/>
                </div>
            })
        }
    </div>
}