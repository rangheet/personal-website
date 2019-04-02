import React, { Component, Fragment} from "react";
import { actions } from "./ducks";
import { connect } from "react-redux";
import { formatDate } from "../../util";
import { map } from "lodash";
import "./experiences.css";
import { Paper, Grid, Typography, Chip } from '@material-ui/core';
import { config } from "../../config";

class Experiences extends Component{

    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        this.props.getExperiences();
    }

    render()
    {
        let experiences=this.props.experiences.allExperiences;
        return (
            <Fragment>
                <div id="Experiences" className="experiencesWrapperDiv" >
                        <Typography variant="h4" color="inherit" align="left">
                                Experiences:
                        </Typography>
                        {map(experiences,(experience,index) => {

                            return (<Fragment key={index}>
                                        <Paper square className="experiencePaper">
                                            <Grid container direction="row">
                                                <Grid item className="pictureContainer">
                                                    <a href={experience.companyLogo.url} target="_blank" ref="noopener"><img id={`${experience.companyLogo.logoname}-logo`} className="logo-div" src= {experience.companyLogo.filenameOnServer ? config.BackendEndpoint+experience.companyLogo.filenameOnServer : undefined} alt={experience.companyLogo.logoname}/></a>
                                                </Grid>
                                                <Grid item>
                                                    <div className="pictureDivider"/>
                                                </Grid>
                                                <Grid item>
                                                    <div>
                                                        <Typography variant="h5" color="inherit" align="left">
                                                            {experience.companyName}
                                                            <a href={experience.companyLogo.url} target="_blank" ref="noopener" className="linkIcon"><i className="material-icons">link</i></a>
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="inherit" align="left">
                                                            {experience.position}
                                                        </Typography>
                                                        <Typography variant="body1" color="inherit" align="left">
                                                            {map(experience.workDescription, (descriptionItem,index) => 
                                                                <li key={index}>{descriptionItem}</li>
                                                            )}
                                                        </Typography>
                                                        <Grid container direction="row" className="experienceTechSkillContainer">
                                                            {map(experience.technologies,(technology, index) => 
                                                                <Grid item key={index}>
                                                                    <Chip label={technology} className="experienceChip" color="primary"/>                                                                
                                                                </Grid>
                                                            )}
                                                        </Grid>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <div className="experienceLocationTime">
                                                        <Typography variant="subtitle1" color="inherit" align="left">
                                                            {formatDate(experience.startTime)}-{formatDate(experience.endTime)} <br/>                                                                               
                                                        </Typography>
                                                        <Grid container direction="row">
                                                            <Grid item>
                                                                <i className="material-icons">location_on</i>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="subtitle1" color="inherit" align="left">
                                                                    {experience.location}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Grid>
                                            </Grid>                                                   
                                        </Paper> 
                                    </Fragment>)})}
                </div>
            </Fragment>
        );
    } 

}

function mapStateToProps(state)
{
    return { 
        experiences: state.experiences,
        logos: state.logos 
    }; 
}

function mapDispatchToProps(dispatch)
{
    return {  getExperiences: () => dispatch(actions.getExperiences()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiences);