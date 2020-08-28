import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Minipalette from './Minipalette';
import bg from './styles/bg.svg'
import {CSSTransition , TransitionGroup} from 'react-transition-group'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue , red } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
	"@global" : {
		".fade-exit" : {
			opacity:"1"
		},
		".fade-exit-active" : {
			opacity:"0",
			transition:"opacity 0.5s ease-out"
		}
	},
	root:{
		height:"100%",
		display:"flex",
		alignItems:"flex-start",
		justifyContent:"center",
		backgroundColor: "#ffffff",
        backgroundImage: `url(${bg})`
	},
	container:{
		width:"50%",
		display:"flex",
		alignItems:"flex-start",
		flexDirection:"column",
		flexWrap:"wrap"
	},
	nav:{
		display:"flex",
		width:"100%",
		justifyContent:"space-between",
		color:"white",
		alignItems:"center",
		color:"white",
		"& a": {
		color: "white",
		textDecoration:"none",
		border: "1px solid white",
		padding: "5px 10px",
		borderRadius: "10px"
	}
	},
	palletes:{
		boxSizing:"border-box",
		width:"100%",
		display:"inline-block",
		gridTemplateColumns:"repeat(3, 30%)",
		gridGap:"5%",
		"& : hover":{
			cursor:"pointer"
		}
	}
	
}

class Palettelist extends Component {
	constructor(props){
		super(props)
		this.state = {
			openDeleteDialog : false,
			deletePaletteId: ""
		}
		this.handleOpenDeleteDialog = this.handleOpenDeleteDialog.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.openDeleteDialog = this.openDeleteDialog.bind(this)
		this.closeDeleteDialog = this.closeDeleteDialog.bind(this)
	}
	
	handleOpenDeleteDialog(id){
		this.setState({deletePaletteId:id})
		this.openDeleteDialog()
	}
	
	handleDelete(){
		this.props.deletePalette(this.state.deletePaletteId)
		this.closeDeleteDialog()
	}
	
	openDeleteDialog(){
		this.setState({openDeleteDialog: true})
	}
	
	closeDeleteDialog(){
		this.setState({openDeleteDialog:false , deletePaletteId:""})
	}
	
	handleClick(id){
		this.props.history.push(`/palette/${id}`)
	}
	render(){
		const {palettes , deletePalette} = this.props;
		const classes = this.props.classes
		console.log(classes)
		return(
			<div className = {classes.root}>
				<div 
					className = {classes.container}
					style = {{
						width:"50%",
						display:"flex",
						alignItems:"flex-start",
						flexDirection:"row",
						flexWrap:"wrap"
					}}
				>
					<nav className = {classes.nav}>
						<h1>Color Site</h1>
						<Link to = "/palette/new">Create Palette</Link>
					</nav>
					<div
						className = {classes.palettes}
						style = {{
							boxSizing:"border-box",
							width:"100%",
							display:"inline-block",
							gridTemplateColumns:"repeat(3, 30%)",
							gridGap:"5%",
						}}
					>
						<TransitionGroup>
							{this.props.palettes.map(palette => (
								<CSSTransition key = {palette.id} classNames = "fade" timeout={500} >
									<Minipalette 
										{...palette} 
										handleClick = {() => this.handleClick(palette.id)}
										handleOpenDeleteDialog = {this.handleOpenDeleteDialog}
										key = {palette.id}
										id = {palette.id}
										/>
								</CSSTransition>
							))}
						</TransitionGroup>
					</div>
				</div>
				<Dialog open = {this.state.openDeleteDialog} onClose = {this.closeDeleteDialog}>
					<DialogTitle>
						Delete Palette?
					</DialogTitle>
					<List>
						<ListItem button onClick = {this.handleDelete}>
							<ListItemAvatar>
								<Avatar style = {{backgroundColor:blue[100] , color : blue[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Delete</ListItemText>
						</ListItem>
						<ListItem button onClick = {this.closeDeleteDialog}>
							<ListItemAvatar>
								<Avatar style = {{backgroundColor:red[100] , color : red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Cancel</ListItemText>
						</ListItem>
					</List>
				</Dialog>
			</div>
		)
	}
}

export default withStyles(styles)(Palettelist);