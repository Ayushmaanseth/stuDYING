import React from 'react';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar'
import MeetupList from './MeetupList'

class Feed extends React.Component {
    render() {
        return (
            <React.Fragment>
                <SearchBar/>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    // justify="center"
                    style={{minHeight: '100vh'}}
                >

                    <Grid item xs={8}>
                        <MeetupList/>
                    </Grid>

                </Grid>

            </React.Fragment>
        );
    }

}

export default Feed;
