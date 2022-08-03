import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
// import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CheckboxList({ input, setInput, checked, setChecked }) {
    // const [checked, setChecked] = React.useState([]);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        // console.log(value);

        setChecked(newChecked);
        // console.log(checked);
    };

    const handleDelete = (value) => {
        console.log(value);
    };

    return (
        <List
            sx={{
                width: '100%',
                border: '2px dashed',
                color: 'black',
                backgroundColor: 'white',
            }}
        >
            {Object.keys(input).map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem
                        key={value}
                        // secondaryAction={
                        //     <IconButton
                        //         edge="end"
                        //         aria-label="comments"
                        //         // onClick={handleDelete(value)}
                        //         // onClick={handleDelete(value)}
                        //     >
                        //         <DeleteIcon onClick={handleDelete(value)}/>
                        //     </IconButton>
                        // }
                        // onClick={(e) => console.log(e)}
                        disablePadding
                    >
                        <ListItemButton
                            role={undefined}
                            onClick={handleToggle(value)}
                            // onClick={}
                            dense
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    // check={-1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={` ${value}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
