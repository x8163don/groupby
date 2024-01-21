import {
    Button,
    Dialog,
    DialogBody, DialogFooter,
    IconButton, Input,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix, Radio,
    Typography
} from "@material-tailwind/react";
import {CheckIcon, TrashIcon} from "@heroicons/react/16/solid";
import {useEffect, useRef, useState} from "react";
import Player from "../domain/Player";

export default function AddPlayerModal({isOpen, handleOpen, session, onAddPlayer}) {
    const playerNameRef = useRef()
    const maleRadioRef = useRef()

    const [playerList, setPlayerList] = useState([]);
    const [readyToJoinPlayers, setReadyToJoinPlayers] = useState([])

    useEffect(() => {
        const fetchPlayerList = () => {
            const playerDataList = localStorage.getItem("PlayerList") ? JSON.parse(localStorage.getItem('PlayerList')) : [];

            const initPlayerList = []
            playerDataList.forEach(playerData => {
                const player = new Player(playerData.id, playerData.name, playerData.gender, playerData.joinTimes)
                initPlayerList.push(player)
            })
            initPlayerList.sort((a, b) => a.joinTimes - b.joinTimes)
            setPlayerList(initPlayerList);

            setReadyToJoinPlayers(session.sessionPlayers.map(join => join.player))
        };

        fetchPlayerList();
    }, []);

    const isSelect = (id) => {
        return readyToJoinPlayers.find(player => player.id === id)
    }

    const newPlayerHandler = () => {
        const name = playerNameRef.current.value
        if (!name) {
            return
        }
        const gender = maleRadioRef.current.checked ? 'male' : 'female'

        const newPlayer = new Player(+Date.now(), name, gender)

        setPlayerList((prev) => {
            return [newPlayer, ...prev]
        })
        setReadyToJoinPlayers(prev => {
            return [newPlayer, ...prev]
        })

        playerNameRef.current.value = ''
    }

    const removePlayerHandler = (playerID) => {
        setPlayerList((prev) => {
            return prev.filter(player => player.id !== playerID)
        })
        setReadyToJoinPlayers((prev) => {
            return prev.filter(player => player.id !== playerID)
        })
    }

    return <Dialog open={isOpen} handler={handleOpen}>
        <DialogBody>
            <List className="h-96 overflow-y-scroll mb-4">
                {playerList.map(player => {
                    return <ListItem onClick={() => {
                        if (!readyToJoinPlayers.find(p => p.id === player.id)) {
                            setReadyToJoinPlayers([...readyToJoinPlayers, player])
                        } else {
                            setReadyToJoinPlayers(readyToJoinPlayers.filter(p => p.id !== player.id))
                        }
                    }}>
                        <ListItemPrefix>
                            {
                                isSelect(player.id) && <CheckIcon className="h-5 w-5"/>
                            }
                        </ListItemPrefix>

                        <Typography>{player?.name}</Typography>

                        <ListItemSuffix>
                            <IconButton variant="text" onClick={() => removePlayerHandler(player.id)}>
                                <TrashIcon className="h-5 w-5"/>
                            </IconButton>
                        </ListItemSuffix>
                    </ListItem>
                })}
            </List>

            <div className="flex justify-start items-center flex-wrap">
                <div className="w-fit">
                    <Input size="md" label="新成員暱稱" placeholder="新成員暱稱" inputRef={playerNameRef}/>
                </div>

                <div className="flex-1 flex w-fit">
                    <Radio name="gender" defaultChecked label="男" color="blue" inputRef={maleRadioRef}/>
                    <Radio name="gender" label="女" color="red"/>
                </div>

                <Button
                        variant="gradient"
                        size="md"
                        color="green"
                        onClick={newPlayerHandler}>
                    新增</Button>
            </div>

        </DialogBody>
        <DialogFooter>
            <Button variant="text" color="red" onClick={handleOpen}>取消</Button>
            <Button variant="gradient" color="green" onClick={() => {
                onAddPlayer(playerList, readyToJoinPlayers)
                handleOpen()
            }}>確定</Button>
        </DialogFooter>
    </Dialog>
}