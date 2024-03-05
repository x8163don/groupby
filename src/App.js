import './App.css'
import {proxy, useSnapshot} from 'valtio'
import Session from "./domain/Session";
import Court from "./domain/Court";
import Join from "./domain/Join";
import {default as CourtView} from "./component/Court";
import SessionInformation from "./component/SessionInformation";
import PlayerArea from "./component/PlayerArea";
import PlayCountBaseGroup from "./domain/PlayCountBaseGroup";
import GenderBaseGroup from "./domain/GenderBaseGroup";
import RandomBaseGroup from "./domain/RandomBaseGroup";
import {useEffect} from "react";

const session = proxy(new Session(1))

function App() {

    const snapshot = useSnapshot(session)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (session.courts.length === 0) {
            session.addCourt(new Court(+Date.now(), 4))
        }
    }, [])

    const addCourtHandler = () => {
        session.addCourt(new Court(+Date.now(), 4))
    }

    const removeCourtHandler = (courtID) => {
        session.removeCourt(courtID)
    }

    const addSessionPlayerHandler = (playerList, readyToJoinPlayers) => {
        readyToJoinPlayers.forEach((player) => {
            session.addJoin(new Join(session, player))
        })

        const notReadyToJoinPlayers = playerList.filter((player) => {
            return readyToJoinPlayers.findIndex((readyToJoinPlayer) => readyToJoinPlayer.id === player.id) === -1
        })

        notReadyToJoinPlayers.forEach((player) => {
            session.removeJoinPlayer(player.id)
        })

        const deletedPlayers = session.sessionPlayers.filter((join) => !playerList.find((player) => player.id === join.player.id))

        deletedPlayers.forEach((join) => {
            session.removeJoinPlayer(join.player.id)
        })

        localStorage.setItem("PlayerList", JSON.stringify(playerList))
    }

    const groupHandler = () => {
        session.group()
    }

    const endGameHandler = (courtID) => {
        session.endGame(courtID)
    }

    const cleanHandler = (courtID) => {
        session.cleanCourt(courtID)
    }

    const onPlayerRest = (playerID) => {
        session.changePlayerRestState(playerID)
    }

    const onGroupStrategyChange = (strategyName) => {
        switch (strategyName) {
            case 'PlayCountBaseGroup':
                session.groupStrategy = new PlayCountBaseGroup()
                break
            case 'GenderBaseGroup':
                session.groupStrategy = new GenderBaseGroup()
                break
            case 'RandomBaseGroup':
                session.groupStrategy = new RandomBaseGroup()
                break
            default:
                session.groupStrategy = new PlayCountBaseGroup()
                break
        }
    }

    const onResetGamePlayCount = () => {
        session.sessionPlayers.forEach((join) => {
            join.gamePlayCount = 0
        })
    }

    return <div
        className="grid gap-y-2 grid-cols-1 auto-rows-auto sm:p-16 grid-rows-[calc(100vh-186px)_90px_80px] sm:grid-rows-[80px_90px_calc(100vh-250px)]">
        <SessionInformation
            className="mb-4 row-start-3 sm:row-start-1 sm:mb-0"
            session={snapshot}
            onAddCourt={addCourtHandler}
            onGroup={groupHandler}
            onAddPlayer={addSessionPlayerHandler}
            onGroupStrategyChange={onGroupStrategyChange}
            onResetGamePlayCount={onResetGamePlayCount}
        />

        <PlayerArea
            className="px-2 row-start-2 sm:row-start-2 overflow-x-auto"
            session={snapshot}
            onAddPlayer={addSessionPlayerHandler}
            onPlayerRest={onPlayerRest}
        />

        <div className="row-start-1 sm:row-start-3 flex gap-4 overflow-x-auto">
            {
                snapshot.courts.map((court, i) => {
                    return <CourtView key={court.id}
                                      no={i + 1}
                                      court={court}
                                      onRemoveCourt={() => removeCourtHandler(court.id)}
                                      onEndGame={() => endGameHandler(court.id)}
                                      onClean={()=> cleanHandler(court.id)}
                    />
                })
            }
        </div>
    </div>
}

export default App;
