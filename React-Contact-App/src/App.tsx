import  React from "react";

import GithubProfileSearchApp from "./components/github/GithubProfileSearchApp";

interface IProps {

}
interface IState {
  userInfo : object
}

class App extends React.Component<IProps, IState>{

    constructor(props:IProps) {
        super(props);
        this.state={
            userInfo : {
                name : 'Arif',
                age : 25
            }
        }
    }


    render(){
        return(
            <React.Fragment>
                <nav className="navbar navbar-dark bg-success text-white  navbar-expand-sm">
                    <a href="" className="navbar-brand text-center">React With Github Profile Search</a>
                </nav>


                <GithubProfileSearchApp/>

            </React.Fragment>
        )
    }
}

export default App;