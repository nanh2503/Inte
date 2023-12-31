import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux/redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login';
import System from '../routes/System';
import CustomScrollbars from '../components/CustomScrollbars';
import { Counter } from '../redux/slices/counter'

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            // <Fragment>
            //     <Router history={history}>
            //         {/** save data when refresh avoid calling data many times */}
            //         <div className="main-container">

            //             <div className="content-container">
            //                 <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
            //                     <Switch>
            //                         {/**Switch URL */}
            //                         <Route path={path.HOME} exact component={(Home)} />
            //                         <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
            //                         <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
            //                     </Switch>
            //                 </CustomScrollbars>
            //             </div>

            //             {/** show notifications about actions */}

            //             <ToastContainer
            //                 position="bottom-right"
            //                 autoClose={3000}
            //                 hideProgressBar={false}
            //                 newestOnTop={false}
            //                 closeOnClick
            //                 rtl={false}
            //                 pauseOnFocusLoss
            //                 draggable
            //                 pauseOnHover
            //                 theme="dark"
            //             />
            //         </div>
            //     </Router>
            // </Fragment>
            <Counter />

        )
    }
}

/**save state of redux */
const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.users.isLoggedIn
    };
};

/**save events of redux */
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);