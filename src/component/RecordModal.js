import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    List,
    ListItem,
} from "@material-tailwind/react";

export default function RecordModal({isOpen, handleOpen, session, onResetGamePlayCount}) {
    return <Dialog open={isOpen} handler={handleOpen}>
        <DialogBody>
            <List className="h-96 overflow-y-scroll">
                {
                    session.sessionPlayers.map(join => {
                        return <ListItem ripple={false}>
                            {join.player.name}: {join.gamePlayCount}
                        </ListItem>
                    })
                }
            </List>
        </DialogBody>
        <DialogFooter>
            <Button variant="text" color="red" onClick={handleOpen}>取消</Button>
            <Button variant="gradient" color="green" onClick={() => {
                onResetGamePlayCount()
            }}>重置</Button>
        </DialogFooter>
    </Dialog>
}