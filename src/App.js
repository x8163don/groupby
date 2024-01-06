import './App.css'
import {proxy, useSnapshot} from 'valtio'
import Session from "./domain/Session";
import Court from "./domain/Court";
import Join from "./domain/Join";
import CourtView from "./component/CourtView";
import Player from "./domain/Player";
import {Button} from "@material-tailwind/react";

const session = proxy(new Session(1))

function App() {

    const snapshot = useSnapshot(session)

    const removeCourtHandler = (courtID) => {
        session.removeCourt(courtID)
    }

    const addSessionPlayerHandler = (player) => {
        session.addJoin(new Join(session, player))
    }

    const groupHandler = () => {
        session.group()
    }

    const endGameHandler = (courtID) => {
        session.endGame(courtID)
    }

    return <div>
        <p>{snapshot.sessionPlayers.length}</p>
        <p>{snapshot.courts.length}</p>

        <Button onClick={() => session.addCourt(new Court(+Date.now()
            , 4))}>addCourt
        </Button>

        <Button onClick={() => {
            const player = new Player(+Date.now(), 'test', 'man')
            const join = new Join(session,player)
            session.addJoin(join)

        }}>addPlayer</Button>

        <Button onClick={groupHandler}>group</Button>

        {
            snapshot.courts.map((court,i) => {
                return <CourtView key={court.id}
                                  no={i+1}
                                  court={court}
                                  onRemoveCourt={() => removeCourtHandler(court.id)}
                                  onEndGame={() => endGameHandler(court.id)}
                />
            })
        }

        {
            session.getNotInGamePlayers().map(player => <p key={player.id}>{player.name}</p>)
        }



    </div>
}

export default App;
