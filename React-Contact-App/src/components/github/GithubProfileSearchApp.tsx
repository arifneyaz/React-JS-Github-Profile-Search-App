import React from  'react';
import {GithubCred} from "./credentials/GithubCred";
import axois from 'axios';
import {IProfile} from "./models/IProfile";
import {IRepository} from "./models/IRepository";
import GithubProfile from "./profile/GithubProfile";
import GithubRepos from "./repos/GithubRepos";

interface IProps {

}

interface IState {
    githubUserName : string,
    profile : IProfile,
    repos : IRepository[],
}

class GithubProfileSearchApp extends React.Component<IProps, IState>{
    constructor(props:IProps) {
        super(props);
        this.state = {

            githubUserName : '',
            profile : {} as IProfile,
            repos : [] as IRepository[]
        }
    }

    changeInput = (event:React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({
            ...this.state,
             githubUserName : event.target.value
        });
    };

    submitSearch = (event:React.FormEvent<HTMLFormElement>) =>{  //react form event on html forms event
        event.preventDefault(); // to avoid page refresh
        this.searchProfile(this.state.githubUserName);
        this.searchRepos(this.state.githubUserName);
    }

    //search Profile of user
    searchProfile = (githubUser:string) =>{
        let dataURL:string = `https://api.github.com/users/${githubUser}?Client_ID=${GithubCred.Client_ID}&Client_Secret=${GithubCred.client_Secret}`;
         axois.get(dataURL).then( (response)=>{
                this.setState({
                    ...this.state,
                    profile : response.data,
                })
         }).catch( (error)=>{
             console.error(error);
         });
    };

    //search Repos of user
    searchRepos = (githubUser:string) =>{
        let dataURL:string = `https://api.github.com/users/${githubUser}/repos?Client_ID=${GithubCred.Client_ID}&Client_Secret=${GithubCred.client_Secret}`;
        axois.get(dataURL).then( (response)=>{
            this.setState({
                ...this.state,
                repos : response.data,
            })
        }).catch( (error)=>{
            console.error(error);
        });
    };


    render(){
        return(
            <React.Fragment>
                {/*<pre>{JSON.stringify(this.state.githubUserName)}</pre>*/}
                <section className="mt-3">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="h3 text-primary">Github Search App</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, cumque dolores eius expedita, illo laudantium maiores, nesciunt nisi omnis rem vel voluptatibus. Enim error facilis in laborum odit officiis sunt.</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <form onSubmit={this.submitSearch}>
                                   <div className="row">
                                       <div className="col-md-4">
                                           <div className="form-group">
                                               <input
                                                   // value = {this.state.githubUserName}
                                                   onChange={this.changeInput}
                                                   type="text" className="form-control" placeholder="Github Username" />
                                           </div>
                                       </div>
                                       <div className="col-md-2">
                                           <div className="form-group">
                                               <input type="submit" className="btn btn-success btn-sm" value="Search"  />
                                           </div>
                                       </div>
                                   </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
               <div className="section mt-4">
                   <div className="container">
                       <div className="row">
                           <div className="col">
                               {
                                   Object.keys(this.state.profile).length > 0 &&
                                   <GithubProfile profile = {this.state.profile}/>
                               }
                           </div>
                       </div>
                   </div>
               </div>
                <div className="section mt-4">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {
                                    this.state.repos.length > 0 &&
                                    <GithubRepos repos = {this.state.repos}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default GithubProfileSearchApp;
