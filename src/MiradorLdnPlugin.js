import React, { Component, Fragment } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Notifications from '@material-ui/icons/Notifications';
import ImportExport from '@material-ui/icons/ImportExport';
import Axios from 'axios'
import Notification from './Notification'
import { receiveManifest } from 'mirador/dist/es/src/state/actions/manifest';
import { removeInfoResponse } from 'mirador/dist/es/src/state/actions/infoResponse';




class MiradorLdnPlugin extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.state = {
      showErrorDialog: false ,
      notifications: []
    };
  }
  handleButtonClick(){
    this.setState(prevState => ({ showErrorDialog: !prevState.showErrorDialog }));
  }
  handleRetrieve(){
    this.setState(prevState => ({ showErrorDialog: !prevState.showErrorDialog }));
  }
  componentDidMount(){
    console.log("I have mounted")
    //const inbox = "https://inbox.rerum.io/messages"
    const inbox = "http://127.0.0.1:8080/test.json"
    const focusedWindowId = this.props.state.workspace.focusedWindowId
    const focusedManifest = this.props.state.windows[focusedWindowId].manifestId
    Axios.get(inbox, {params: {target: focusedManifest}}).then((data) => {
      console.log(data)
      this.setState({notifications: data.data.contains})
    });
  }
  render() {
    const displayNotifications = () => {
      const notificationsMap = this.state.notifications.map((n) => {
        console.log(n)
        return (

          <Notification notification={n} key={n["@id"]} state={this.props.state} receiveManifest={this.props.receiveManifest} removeInfoResponse={this.props.removeInfoResponse}/>

          )
      });
      return notificationsMap


    }
    return <div>
      <IconButton onClick={this.handleButtonClick}>
        <Notifications/>
      </IconButton>
      <Dialog open={this.state.showErrorDialog} onClose={this.handleButtonClick}>
          <DialogContent>
          {displayNotifications()}
          </DialogContent>
        </Dialog>



    </div>
  }
}

const mapStateToProps = (state) => ({
  state: state
});

// const mapDispatchToProps = (dispatch, { manifestId, manifestJson }) => ({
//   receiveManifest: () => dispatch(mirador.actions.receiveManifest(manifestId, manifestJson)),
// });

const mapDispatchToProps = (dispatch, {manifestId, manifestJson}) => ({
  receiveManifest: () => dispatch(receiveManifest(manifestId, manifestJson))
})

export default {
  target: 'WindowTopMenu',
  mode: 'add',
  component: MiradorLdnPlugin,
  mapDispatchToProps: mapDispatchToProps,
  mapStateToProps: mapStateToProps
}
