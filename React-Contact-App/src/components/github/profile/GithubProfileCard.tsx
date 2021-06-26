import React from  'react';
import {IProfile} from "../models/IProfile";

interface IProps {
    profile : IProfile,
}

interface IState {

}

class GithubProfileCard extends React.Component<IProps, IState>{
    constructor(props:IProps) {
        super(props);
    }

    render(){
        let {profile} = this.props;
        return(
            <React.Fragment>
             <div className="card">
                 <img src={profile.avatar_url} alt="" className="img-fluid"/>
                 <div className="card-body">
                     <p className="h4">{profile.name}</p>
                     <small>{profile.bio}</small>
                     <a href={profile.html_url} target="_blank" className="btn btn-success btn-sm text-white">Profile</a>
                 </div>
             </div>
            </React.Fragment>
        )
    }
}

export default GithubProfileCard;
