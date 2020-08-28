import React , {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Link} from 'react-router-dom'
import './Colorbox.css'

class Colorbox extends Component{
	constructor(props){
		super(props)
		this.state ={
			copied:false
		}
		this.handleCopy = this.handleCopy.bind(this)
	}
	handleCopy(){
		this.setState({copied: true})
		setTimeout(() => this.setState({copied:false}) , 1500)
	}
	render(){
		let moreUrl = this.props.moreUrl
		return(
			<CopyToClipboard text ={this.props.color}>
				<div style = {{background:this.props.color}} className = "Color-box">
				<div style = {{background:this.props.color}} className = {`copy-overlay ${this.state.copied && "show"}`}                       onClick = {this.handleCopy}/>
				<div className = {`copy-msg ${this.state.copied && "show"}`} >
					<h1>COPIED!!!</h1>
					<p>{this.props.color}</p>
				</div>
				<div className = "copy-container">
					<div className = "box-content">
						<span>{this.props.name}</span>
					</div>
					<button className = "copy-button">Copy</button>
				</div>
                 {this.props.moreButton && (
	                <Link to = {moreUrl} onClick = {e => e.stopPropagation()}>
						<span className = "more">More</span>
					</Link>
                 )}
				</div>
			</CopyToClipboard>
		)
	}
}

export default Colorbox;