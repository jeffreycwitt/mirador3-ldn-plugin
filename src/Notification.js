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
      if (this.props.notification.object["@type"] == "sc:Range"){

        this.setState({data: d.data.ranges});
        const manifest = this.props.state.manifests[this.props.notification.target]
        manifest.json.structures = d.data.ranges

        this.props.receiveManifest(this.props.notification.target, manifest)
      }
      else if (this.props.notification.object["@type"] == "sc:Layer"){

        let listCanvasMap = {}
        d.data.otherContent.forEach((i) => {
          const url = i["sc:forCanvas"].replace('http://', 'https://')
          listCanvasMap[url] = i["@id"]
        })

        const manifest = this.props.state.manifests[this.props.notification.target]
        const canvases = manifest.json.sequences[0].canvases
        const newCanvases = canvases.map((c) => {
          console.log("canvas", c["@id"])
          const canvasid = c["@id"]
          console.log("listcanvasMap", listCanvasMap)
          console.log("transcriptionid", listCanvasMap[canvasid])
          const canvas = {
            ...c,
            otherContent: [{
              "@id": listCanvasMap[c["@id"]],
              "@type": "sc:AnnotationList"
            }]
          }
          return canvas
        });
        manifest.json.sequences[0].canvases = newCanvases
        this.props.receiveManifest(this.props.notification.target, manifest.json)
      }

    });

  }
  componentDidMount(){

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
