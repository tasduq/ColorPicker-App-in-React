import React , {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';

const styles = {
	root:{
		width: "20%",
		height : "25%",
		display : "inline-block",
		margin : "0 auto",
		position:"relative",
		marginBottom: "-4.5px",
		"&:hover svg" : {
		color:"white",
		transform:"scale(1.5)"
	}
		
	},
	boxContent:{
		position:"absolute",
		width:"100%",
		left :"0px",
		bottom:"0px",
		padding:"10px",
		color : "black",
		letterSpacing:"1px",
		textTransfor : "uppercase",
		fontSize :"12px",
		display : "flex",
		justifyContent:"space-between"
	},
	deleteIcon:{
		transition:"all 0.3s ease-in-out",
		"& : hover":{
			cursor:"pointer"
		}
	}
	
}

const Dragablecolorbox = SortableElement((props) =>{
	
		let classes = props.classes
		console.log(classes)
		return(
			<div className = {classes.root} style = {{backgroundColor : props.color }}>
				<div className = {classes.boxContent}>
					<span>{props.name}</span>
					<DeleteIcon className = {classes.deleteIcon}  onClick = {props.removeBox} />
				</div>
				
			</div>
		)
})

export default withStyles(styles)(Dragablecolorbox)