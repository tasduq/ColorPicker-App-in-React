import React , {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
	root:{
		backgroundColor:"white",
		border:"1px solid black",
		borderRadius: "5px",
		padding:"0.5rem",
		position:"relative",
		overflow:"hidden",
		marginBottom:"1rem",
		cursor:"pointer",
		"&:hover svg":{
			opacity:"1"
		}
	},
	box:{
		backgroundColor:"grey",
		height:"150px",
		width:"100%",
		borderRadius:"5px",
		overflow:"hidden"
	},
	title:{
		display:"flex",
		justifyContent:"space-between",
		alignItems:"center",
		margin:"0",
		color:"black",
		paddingtop:"0.5rem",
		fontSize:"1rem",
		
		position:"relative",
		"& hover":{
			cursor:"pointer"
		}
	},
	emoji:{
		marginLeft:"0.5rem",
		fontSize:"1.5rem"
	},
	minicolor:{
		height:"25%",
		width:"20%",
		display:"inline-block",
		margin:"0 auto",
		position:"relative",
		marginBottom:"-3.5px"
	},
	delete:{
		
	},
	deleteIcon:{
		color:"white",
		backgroundColor:"red",
		width:"20px",
		height:"20px",
		position:"absolute",
		right:"0px",
		top:"0px",
		padding:"10px",
		zIndex:"10",
		opacity:"0"
	}
	
}

class  Minipalette extends Component{
	constructor(props){
		super(props)
		this.handleDelete = this.handleDelete.bind(this)
	}
	
	handleDelete(evt){
		evt.stopPropagation()
		this.props.handleOpenDeleteDialog(this.props.id)
		
	}
	
	render(){
		let {paletteName , emoji , classes , colors} = this.props;
	    console.log(colors)
	
	return(
		<div 
			className= {classes.root} 
			onClick = {this.props.handleClick}
		>
			
			<DeleteIcon 
				className = {classes.deleteIcon}  
				style = {{transition: "all 0.3s ease-in-out"}} 
				onClick = {this.handleDelete}
			/>
			<div className = {classes.box}>
				{colors.map(color => (
					<div className = {classes.minicolor} style = {{backgroundColor : color.color}}>
					</div>
				))}
			</div>
			
			
			<h1 className = {classes.title} >
				{paletteName}
				<span className = {classes.emoji}>{emoji}</span>
			</h1>
		</div>
	)
	}
		
}

export default withStyles(styles)(Minipalette);