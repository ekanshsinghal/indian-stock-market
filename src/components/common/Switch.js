import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Switch } from '@material-ui/core';

export const SwitchStyles = makeStyles(theme => ({
    root: {
        width: 45,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        color: '#fff',
        '&$checked': {
            transform: 'translateX(19px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
            },
            '&$disabled': {
                color: theme.palette.grey[700],
                '& + $track': {
                    opacity: 0.3
                }
            }
        }
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        backgroundColor: '#52d869',
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    disabled: {},
    focusVisible: {},
}))

const CustomSwitch = (props) => {
    const classes = SwitchStyles();

    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
                disabled: classes.disabled,
            }}
            {...props}
        />
    );
};

export default CustomSwitch;