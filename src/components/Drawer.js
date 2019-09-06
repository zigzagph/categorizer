import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
//import Travel from './Travel';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const handleClick = (e) => {
        console.log("handleClickJ:",e);
        console.log(e.target.text)
        
    }

    // const renderLink = React.useMemo(
    //     () =>
    //         React.forwardRef((itemProps, ref) => (
    //             // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
    //             <RouterLink to={Travel} {...itemProps} innerRef={ref} />
    //         )),
    //     [Travel],
    // );

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            {/* <List>
                {['Home', 'Meals & Ent.', 'Travel', 'Other'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                        {
                            index % 2 === 0 ? <InboxIcon /> : <MailIcon />
                        }
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}


            <List>
                <ListItem button key={"home"} onClick={handleClick}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItem>
                {['Meals & Entertainment', 'Travel', 'Other'].map(text => (
                    <ListItem button key={text} onClick={handleClick} component="a" href="/travel">
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <Button onClick={toggleDrawer('left', true)}>Open Left</Button>
            
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}
