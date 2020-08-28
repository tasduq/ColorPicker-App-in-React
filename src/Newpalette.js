import React , {Component} from 'react'
import Dragablecolorbox from './Dragablecolorbox'
import Dragablecontainer from './Dragablecontainer'
import clsx from 'clsx';
import classNames from "classnames";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {ChromePicker} from 'react-color'
import {arrayMove} from 'react-sortable-hoc';
import {Link} from 'react-router-dom'
import Newpalettenameform from './Newpalettenameform'
import {ValidatorForm , TextValidator} from 'react-material-ui-form-validator'

const drawerWidth = 450;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
	  flexDirection:"row",
	  justifyContent:"space-between",
	  
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar:{
	display:"inline-block"  
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
	hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
	display:"flex",
	alignItems:"center",
	justifyContent:"center"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
	height:"100vh",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
	   marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container:{
	  width:"90%",
	  height:"100%",
	  display:"flex",
	  flexDirection:"column",
	  justifyContent:"center",
	  alignItems:"center"
  },
  buttons:{
	  
  },
  addColor:{
	  width:"100%",
	  padding:"1rem",
	  marginTop:"1rem",
	  fontSize:"2rem"
  },
  colorNameInput:{
	  width:"100%"
  }
}));




class Newpalette extends Component {
	static defaultProps = {
		maxBoxes : 20
	}
	constructor(props){
		super(props)
		this.state = {
			open : false,
			currentColor: "#000000",
			colors:this.props.defaultNewPalette.colors,
			newColor:"",
			newPaletteName:"",
			newPaletteNameForm:false
		}
		this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
		this.handleDrawerClose = this.handleDrawerClose.bind(this);
		this.handleChangeColor = this.handleChangeColor.bind(this)
		this.handleAddColor = this.handleAddColor.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.removeBox = this.removeBox.bind(this)
		this.onSortEnd = this.onSortEnd.bind(this)
		this.handleClearPalette = this.handleClearPalette.bind(this)
		this.addRandomColor = this.addRandomColor.bind(this)
		this.handleSavePalette = this.handleSavePalette.bind(this)
		this.handleNewPaletteNameForm = this.handleNewPaletteNameForm.bind(this)
		this.nameNotSame = this.nameNotSame.bind(this)
	}
	
	componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isColorNameSame', (value) => {
           let yoo =  this.state.colors.every(
				(color) => color.name.toLowerCase() !== value.toLowerCase()
				
			)
			return yoo;
        });
		
		ValidatorForm.addValidationRule('isColorSame', (value) => {
           let yoo =  this.state.colors.every(
				(color) => color.color !== this.state.currentColor
				
			)
			return yoo;
        });
		
		
    }
	
	 handleDrawerOpen(){
		this.setState({open : true})
	  };

	  handleDrawerClose(){
		this.setState({open : false})
	  };

	  handleChangeColor(color){
		  this.setState({
			  currentColor:color.hex
		  })
	  }
	  
	  handleAddColor(){
		  let newColor = {color:this.state.currentColor , name : this.state.newColor}
		  this.setState(st => {
			  return{
				   colors: [...st.colors , newColor],
				  newColor:""
			  }
			 
		  })
		  
	  }
      
     handleChange(evt){
		
		  this.setState({ [evt.target.name] : evt.target.value})
	  }

    
	
	handleClearPalette(){
		this.setState({colors : []})
	}
	
	nameNotSame(){
		const allPaletteColors = this.props.palettes.map( (palette) => palette.colors)
		const paletteColors = allPaletteColors.flat()
		let rdm = Math.floor(Math.random()* paletteColors.length )
		let randomBox = paletteColors[rdm]
		let yoo = this.state.colors.every(color => color.name !== randomBox.name)
		if(yoo){
			return randomBox
		}else{
			
			return this.nameNotSame()
		}
		
	}
	
	addRandomColor(){
		// const allPaletteColors = this.props.palettes.map( (palette) => palette.colors)
		// const paletteColors = allPaletteColors.flat()
		// let rdm = Math.floor(Math.random()* allPaletteColors.length )
		let randomBox = this.nameNotSame()
		this.setState(st => {
			return{
				colors : [...st.colors , randomBox ]
			}
		})
	}

    handleSavePalette(paletteInfo){
		 
		 let paletteName = paletteInfo.paletteName;
		let emoji = paletteInfo.emoji
		 
		 let newPalette = {
		 paletteName : paletteName,
		 emoji:emoji,
		 id:paletteName.toLowerCase().replace(/ /g , "-"),
		 colors:this.state.colors
		 }
		 this.props.history.push('/')
		 this.props.savePalette(newPalette)
		 
	 }

     handleNewPaletteNameForm(){
		 console.log("true")
		 this.setState({newPaletteNameForm:!this.state.newPaletteNameForm})
	 }

     removeBox(name){
		 this.setState(st => {
			 return{
				 colors : st.colors.filter(color => color.name !== name)
			 }
		 })
	 }
	
	onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

    
     

	render(){
		console.log(this.state.newPaletteNameForm)
        const classes = this.props.classes;
		let {open} = this.state
	  return (
		<div className={classes.root} >
		  <CssBaseline />
		  <AppBar
			position="fixed"
			color = "default"
			className={clsx(classes.appBar, {
			  [classes.appBarShift]: this.state.open,
			})}
			  
		  >
			<Toolbar 
				className = {classes.toolbar}
				style = {{
					  width : "100%",
					  display : "flex",
					  flexDirection:"row",
					  justifyContent:"space-between",
					  alignItems:"center"
				  }}
				
			>
			<div style = {{display:"flex" , alignItems :"center"}}>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={this.handleDrawerOpen}
					edge="start"
					className={clsx(classes.menuButton, open && classes.hide)}
				  >
					<MenuIcon />
				</IconButton>
			  <Typography variant="h6" noWrap style = {{display : "inline-block" }}>
				New Palette
			  </Typography>
			</div>
			  
				<div style = {{
						marginLeft:"10em",
						
						
					}}>
				<Link to = "/" style = {{textDecoration:"none"}}>
					<Button 
					  variant="contained" 
					  color="secondary" 
				  >
					Go Back
				  </Button>
				</Link>
				 <Button 
					 variant="contained" 
					 color="primary" 
					 onClick={this.handleNewPaletteNameForm}
					 style = {{margin : "0.75rem"}}
				>
				  Save
			    </Button>
			  </div>
			</Toolbar>
			   {this.state.newPaletteNameForm && (<Newpalettenameform savePalette = {this.handleSavePalette}  palettes =                          {this.props.palettes} newPaletteNameForm = {this.handleNewPaletteNameForm} />) }
		  </AppBar>
		  <Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="left"
			open={open}
			classes={{
			  paper: classes.drawerPaper,
			}}
		  >
			<div className={classes.drawerHeader} style = {{
					  display: 'flex',
						alignItems: 'center',
						// padding: theme.spacing(0, 1),
						// necessary for content to be below app bar
						// ...theme.mixins.toolbar,
						justifyContent: 'flex-end',
				  }} >
			  <IconButton onClick={this.handleDrawerClose}>
				 <ChevronRightIcon />
			  </IconButton>
			</div>
			<Divider />
			  <div className = {classes.container} style = {{
					  width:"90%",
					  height:"100%",
					  display:"flex",
					  flexDirection:"column",
					  justifyContent:"center",
					  alignItems:"center",
					  marginTop:"20px"
				  }}>
				  <Typography variant = "h4">Design your Palette</Typography>
			  <div 
				  className = {classes.buttons} 
				  style = {{
						  display:"flex",
						  justifyContent:"center",
						  marginTop : "1rem",
						  marginLeft:"1rem",
							  
					  }}
			>
				  <Button 
					  variant="contained" 
					  color="primary" 
					  onClick = {this.handleClearPalette}
					  style = {{
						  display:"inline-block"
					  }}
				   >
					Clear Palette
				  </Button>
				  <Button 
					  variant="contained" 
					  color="secondary" 
					  onClick = {this.addRandomColor} 
					  disabled = {this.state.colors.length >= this.props.maxBoxes}
					  style = {{
						  backgroundColor : `${this.state.colors.length >= this.props.maxBoxes ? "grey" : ""}` ,
						  display:"inline-block"
					  }}
				  >
					Random Color
				  </Button>
			  </div>
				  <div style = {{
						  margin:"2rem",
						  width:"90%"
					  }}
					>
					  <ChromePicker 
						  color ={this.state.currentColor}
						  onChangeComplete ={this.handleChangeColor}

					  />
				  </div>
			  
			  <ValidatorForm 
				  onSubmit = {this.handleAddColor}
				  style = {{
						  display : "flex",
						  flexDirection : "column",
						  alignItems:"center",
						  justifyContent:"center"
					  }}
				  
			   >
				  <TextValidator
					  className = {classes.colorNameInput}
					  value = {this.state.newColor} 
					  onChange = {this.handleChange}
					  margin = "normal"
					  name = "newColor"
					  validators={['required', 'isColorNameSame' , "isColorSame"]}
                      errorMessages={['this field is required', 'color name must be unique' , "Color should be unique"]}
					  style = {{
						  width : "100%"
					  }}
					  label = "Color Name"
				   />
				  <Button 
					  className = {classes.addColor}
					  variant="contained" 
					  color="primary"
					  style = {{
						  backgroundColor : `${this.state.colors.length >= this.props.maxBoxes ? "grey" :                                                                        this.state.currentColor}` , 
					      color : `${this.state.colors.length >= this.props.maxBoxes ? "white" : ""}`,
						  width:"90%",
						  height : "150px",
						  padding:"1rem",
						  marginTop:"1rem",
						  fontSize:"2rem",
					  }}
					  type = "submit"
					  disabled = {this.state.colors.length >= this.props.maxBoxes}
					  
					  
				   >
					  {this.state.colors.length >= this.props.maxBoxes ? "Palette Full !!" : "Add Color"}
				  </Button>
			  </ValidatorForm>
			  </div>
			  
			  

		  </Drawer>
		  <main
			className={classNames (classes.content, {
			  [classes.contentShift]: this.state.open,
			})}
			style = {{height : "100vh"}}
			onClick = {this.handleDrawerClose}
		  >
			<div className={classes.drawerHeader} style = {{marginBottom : "68px"}} />
			 <Dragablecontainer 
				 colors = {this.state.colors} 
				 removeBox = {this.removeBox}
				 axis = "xy"
				 onSortEnd = {this.onSortEnd}
				 distance = {20}
			 />
				 
		  </main>
		</div>
	  );
	}
  
}

export default withStyles(useStyles , {withTheme:true})(Newpalette)