import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LocationIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import TimeIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button'

const styles = theme => ({
    heading: {
        fontSize: '1.5rem',
        display: 'inline',
    },
    meetupDate: {
        color: '#808080',
        fontSize: '1rem',
    },
    inline: {
        display: 'inline',
    },
    mt: {
        marginTop: '0.7rem',
    },
    listItem: {
        borderRadius: '1rem',
        padding: '3rem',
        boxShadow: '0px 0px 20px 0px rgba(63,81,181,0.2)',
        marginBottom: '3rem',
    },
    button: {
        boxShadow: 'none',
    },
    floatRight: {
        float: 'right',
    }
});

class MeetupListItem extends React.Component {
    state = {
        participants: this.props.participants,
        joined: false,
    };

    formatTags() {
        let formattedTags = [];
        let tags = this.props.tags;
        for (let i = 0; i < tags.length; i++) {
            formattedTags.push(
                <span key={i}>#{tags[i]} </span>
            );
        }
        return formattedTags;
    }

    handleJoin() {
        let oldParticipants = this.state.participants;
        this.setState({
            participants: oldParticipants + 1,
            joined: true,
        });

    }

    showButton(classes) {
        if (this.props.participants >= this.props.maxParticipants || this.state.joined) {
            if (this.props.participants >= this.props.maxParticipants) {
                return (
                    <Button onClick={this.handleJoin.bind(this)} disabled variant="contained" color="secondary"
                            className={classes.button + ' ' + classes.mt + ' ' + classes.floatRight}>
                        Session full
                    </Button>
                )
            } else {
                return (
                    <Button onClick={this.handleJoin.bind(this)} disabled variant="contained" color="secondary"
                            className={classes.button + ' ' + classes.mt + ' ' + classes.floatRight}>
                        Join
                    </Button>
                )
            }
        } else {
            return (
                <Button onClick={this.handleJoin.bind(this)} variant="contained" color="secondary"
                        className={classes.button + ' ' + classes.mt + ' ' + classes.floatRight}>
                    Join
                </Button>
            )
        }

    }

    render() {
        const {classes} = this.props;
        return (
            <ListItem className={classes.listItem} href="#simple-list" alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography component="span" className={classes.meetupDate}
                                        color="textPrimary">
                                <CalendarIcon style={{fontSize: '1rem'}}/> {this.props.eventDate}
                                <TimeIcon style={{fontSize: '1rem', marginLeft: '0.5rem'}}/> {this.props.eventTime}
                            </Typography>
                            <Typography component="span" className={classes.heading} color="textPrimary">
                                {this.props.eventTitle}
                            </Typography>
                        </React.Fragment>
                    }

                    secondary={
                        <React.Fragment>
                            {"By "}
                            <Typography component="span" className={classes.inline} color="textPrimary">
                                {this.props.author}
                            </Typography>
                            <div className={classes.inline} style={{fontSize: '12px', fontWeight: 'bold'}}>
                                <PeopleIcon style={{
                                    fontSize: 15,
                                    verticalAlign: 'middle',
                                    marginLeft: '2rem'
                                }}/> {this.state.participants}/{this.props.maxParticipants}
                                <LocationIcon
                                    style={{fontSize: 15, verticalAlign: 'middle', marginLeft: '0.5rem'}}/> {this.props.distance}
                            </div>
                            <Typography component="span" color="textPrimary" className={classes.mt}>
                                {this.props.description}
                            </Typography>
                            <div className={classes.mt}>
                                {this.formatTags()}
                            </div>
                            {this.showButton(classes)}
                        </React.Fragment>}/>
            </ListItem>
        );
    }
}


MeetupListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MeetupListItem);