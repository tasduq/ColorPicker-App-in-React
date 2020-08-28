import React , {Component} from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider'
import {Link} from 'react-router-dom'
import 'rc-slider/assets/index.css'
import './Navbar.css'

class Navbar extends Component{
	constructor(props){
		super(props)
		this.state = {
			format: "hex",
			open:false
		}
		this.handleFormatChange = this.handleFormatChange.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}
	
	handleFormatChange(evt){
		this.setState({format : evt.target.value , open:true})
		this.props.changeFormat(evt.target.value)
	}
	
	handleClose(){
		this.setState({open : false})
	}
	
	render(){
		return( 
			<header className = "Navbar">
				<div className = "logo">
					<Link to = '/'>Color Site</Link>
				</div>
				<div className = "slider-container">
					{this.props.showLevelBar && (
						<div>
							<span>Level : {this.props.level}</span>
							<div className = "slider">
							<Slider 
							defaultValue = {this.props.level}
							min = {100}
							max = {900}
							step = {100}
							onAfterChange = {this.props.handleLevelChange}
							/>
							</div>
					    </div>
					)}
					
					
					<div className = "select">
						<Select value = {this.state.format} onChange = {this.handleFormatChange}>
							<MenuItem value = "hex">Hex - #ffffff</MenuItem>
							<MenuItem value = "rgb">RGB - (255,255,255)</MenuItem>
							<MenuItem value = "rgba">RGBa - (255,255,255,1.0)</MenuItem>
						</Select>
						<Snackbar
							anchorOrigin={{
							  vertical: 'bottom',
							  horizontal: 'left',
							}}
							open={this.state.open}
							autoHideDuration={3000}
							onClose={this.handleClose}
							message={`Format Changed to ${this.state.format}`}
							action={[
								<IconButton onClick = {this.handleClose} color = 'inherit' key = 'close'>
									<CloseIcon />
								</IconButton>
							]}
						  />
					</div>
				</div>
			</header>
		)
	}
}

export default Navbar;