import React, { Component, PropTypes } from 'react'

class CommonShow extends Component {
    render() {
        return ( 
          <div className = "m-common" style={{top:this.props.data.top+"px",height:this.props.data.height+"px",left:this.props.data.left+"%",width:this.props.data.width+"%"}}>
            <h3>Sample Item</h3>
            <p>Sample Location</p>
          </div>
            
        )
    }
}

export default CommonShow