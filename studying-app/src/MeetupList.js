import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MeetupListItem from './MeetupListItem';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
});


function MeetupList(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <List component="nav">
                <MeetupListItem eventTitle={"Data Structures Revision"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus\n" +
                                "                            cursus\n" +
                                "                            sollicitudin. Aenean quis orci egestas, rhoncus lectus non, iaculis quam.\n" +
                                "                            Praesent\n" +
                                "                            id augue metus. Sed sit amet dictum tellus."}
                                author={"Ali Connors"} eventDate={"09/03/2019"} eventTime={"05:30 PM"}
                                participants={6} maxParticipants={10} tags={["tag", "alsoTag"]} distance={"500m"}/>
                <MeetupListItem eventTitle={"Data Structures Revision"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus\n" +
                                "                            cursus\n" +
                                "                            sollicitudin. Aenean quis orci egestas, rhoncus lectus non, iaculis quam.\n" +
                                "                            Praesent\n" +
                                "                            id augue metus. Sed sit amet dictum tellus."}
                                author={"Ali Connors"} eventDate={"09/03/2019"} eventTime={"05:30 PM"}
                                participants={10} maxParticipants={10} tags={["tag", "alsoTag"]} distance={"900m"}/>
            </List>
        </div>
    );
}

MeetupList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MeetupList);