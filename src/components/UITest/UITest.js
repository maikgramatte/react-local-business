import React, {Component} from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const PersonNames = ['Betty', 'Sue', 'Aaron', 'Jamal', 'Ann']

class Fader extends Component {

    constructor(props) {
        console.log(props);
        super(props);
    }

    render(){

        if(!this.props.children) {
            return null;
        }

        return (
            <div>
                <CSSTransitionGroup
                    transitionName='fade'
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={500}
                >
                { this.props.children }
                </CSSTransitionGroup>
            </div>
        );
    }
}


  class Picker extends Component {
    constructor(props) {
      super(props)
      
      this.state = {
        people: []
      }
    }
  
    render() {
      return (
        <ul>
          <Fader>
            { this.state.people.map(p => <li key={p}>{p}</li>) }
          </Fader>
        </ul>
      )
    }
  
    componentDidMount() {
      // every 2 seconds, change the list of people
      this.interval = setInterval(() => {
        this.setState({
          people: PersonNames
            .map(n => Math.random() > 0.5 ? n : null)
            .filter(n => n !== null) 
        })
      }, 2000)
    }
  }
  
  export default Picker;