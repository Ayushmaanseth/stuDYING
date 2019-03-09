import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import LocationIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    divider: {
        marginBottom: '3rem',
    },
    heading: {
        fontSize: '1.5rem',
        display: 'inline',
    },
    float: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    meetupDate: {
        color: '#808080',
    },
    inline: {
        display: 'inline',
    },
    mt: {
        marginTop: '0.5rem',
    },
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function MeetupList(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItemLink href="#simple-list" alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <div className={classes.float}>
                                <Typography component="span" className={classes.heading} color="textPrimary">
                                    Brunch this weekend?
                                </Typography>
                                <Typography component="span" className={classes.heading + ' ' + classes.meetupDate}
                                            color="textPrimary">
                                    09/03/2019
                                </Typography>
                            </div>
                        }

                        secondary={
                            <React.Fragment>
                                {"By "}
                                <Typography component="span" className={classes.inline} color="textPrimary">
                                    Ali Connors
                                </Typography>
                                <div className={classes.mt} style={{fontSize: '12px', fontWeight: 'bold'}}>
                                    <PeopleIcon style={{fontSize: 15, verticalAlign: 'middle'}}/> 6/10
                                    <LocationIcon
                                        style={{fontSize: 15, verticalAlign: 'middle', marginLeft: '0.5rem'}}/> 900m
                                </div>
                                <Typography component="span" color="textPrimary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus
                                    cursus
                                    sollicitudin. Aenean quis orci egestas, rhoncus lectus non, iaculis quam.
                                    Praesent
                                    id augue metus. Sed sit amet dictum tellus.
                                </Typography>
                            </React.Fragment>}/>
                </ListItemLink>
                <Divider className={classes.divider}/>

                <ListItemLink href="#simple-list" alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <div className={classes.float}>
                                <Typography component="span" className={classes.heading} color="textPrimary">
                                    Brunch this weekend?
                                </Typography>
                                <Typography component="span" className={classes.heading + ' ' + classes.meetupDate}
                                            color="textPrimary">
                                    09/03/2019
                                </Typography>
                            </div>
                        }

                        secondary={
                            <React.Fragment>
                                {"By "}
                                <Typography component="span" className={classes.inline} color="textPrimary">
                                    Ali Connors
                                </Typography>
                                <div className={classes.mt} style={{fontSize: '12px', fontWeight: 'bold'}}>
                                    <PeopleIcon style={{fontSize: 15, verticalAlign: 'middle'}}/> 6/10
                                    <LocationIcon
                                        style={{fontSize: 15, verticalAlign: 'middle', marginLeft: '0.5rem'}}/> 900m
                                </div>
                                <Typography component="span" color="textPrimary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus
                                    cursus
                                    sollicitudin. Aenean quis orci egestas, rhoncus lectus non, iaculis quam.
                                    Praesent
                                    id augue metus. Sed sit amet dictum tellus.
                                </Typography>
                            </React.Fragment>}/>
                </ListItemLink>
                <Divider className={classes.divider}/>
            </List>
        </div>
    );
}

MeetupList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MeetupList);