import React, { Component, Fragment } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Notifications from '@material-ui/icons/Notifications';
import ImportExport from '@material-ui/icons/ImportExport';
import Axios from 'axios'

class Notification extends Component {
  constructor(props) {
    super(props);
    this.handleRetrieve = this.handleRetrieve.bind(this)
    this.state = {
      data: []
    };
  }
  handleRetrieve(){
    Axios.get(this.props.notification.object["@id"]).then((d) => {
      console.log("new test", d)
      this.setState({data: d.data.ranges});
      const manifest = this.props.state.manifests[this.props.notification.target]
      manifest.json.structures = d.data.ranges
      console.log("props", this.props)
      this.props.receiveManifest(this.props.notification.target, manifest)

    })

  }
  componentDidMount(){
    console.log("Notifications have mounted")
  }
  render(){

    return(
      <div>
        <p>{this.props.notification.object.description}</p>
        <p>{this.props.notification.object.attribution}</p>
        <IconButton onClick={this.handleRetrieve}>
          <ImportExport/>
        </IconButton>
    </div>
  )
  }
}

export default Notification
