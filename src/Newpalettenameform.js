import React , {Component} from  'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm , TextValidator} from 'react-material-ui-form-validator'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class Newpalettenameform extends Component{
	constructor(props){
		super(props)
		this.state = {
			stage : "form",
			newPaletteName:""
			
		}
		this.handleClickOpen = this.handleClickOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSavePalette = this.handleSavePalette.bind(this)
		this.handleStage = this.handleStage.bind(this)
		this.selectEmoji = this.selectEmoji.bind(this)
	}
	
	componentDidMount(){
		ValidatorForm.addValidationRule('isPaletteNameSame', (value) => {
           let yoo =  this.props.palettes.every(
				(palette) => palette.paletteName.toLowerCase() !== value.toLowerCase()
				
			)
			return yoo;
        });
	}
	
	 handleChange(evt){
		
		  this.setState({ [evt.target.name] : evt.target.value})
		 console.log(evt.target.value)
	  }
	
	handleStage(evt){
		this.setState({stage : "emoji"   })
		console.log(this.state.newPaletteName)
	}
	
	selectEmoji(emoji){
		let paletteInfo = {
			paletteName:this.state.newPaletteName,
			emoji:emoji.native
		}
		
		this.props.savePalette(paletteInfo)
	}
	
	handleSavePalette(){
		
	}
	
	 

	
	handleClickOpen(){
    this.setState({open:true})
  };

  handleClose(){
    this.setState({open:false})
  };
	
	render(){
		return(
			<div>
			
			  <Dialog 
				  open={this.state.stage === "form"} 
				  onClick={this.newPaletteNameForm} 
				  aria-labelledby="form-dialog-title"
			  >
				<DialogTitle id="form-dialog-title">Enter Palette Name</DialogTitle>
				
				  <ValidatorForm onSubmit = {this.handleStage} >
				<DialogContent>
					  <DialogContentText>
						Please enter unique Palette Name
					  </DialogContentText>
					   
						<TextValidator 
							label = "Palette Name"
							fullLength
							margin = "normal"
							value = {this.state.newPaletteName}
							onChange = {this.handleChange}
							name = "newPaletteName"
							validators={['required', 'isPaletteNameSame' ]}
						  errorMessages={['this field is required', 'Palette name must be unique']}
						/>
				</DialogContent>
					<DialogActions>
					  <Button onClick={this.props.newPaletteNameForm} color="primary">
						Cancel
					  </Button>
					  <Button 
						variant="contained" 
						color="primary" 
						type= "submit"
					   >
						Save Palette
					</Button>
					</DialogActions>
				</ValidatorForm>
              </Dialog>
			  <Dialog open = {this.state.stage === "emoji"}>
				  <DialogTitle id="form-dialog-title">Choose Emoji for your Palette</DialogTitle>
				  <Picker onSelect={this.selectEmoji} />
			  </Dialog>
		</div>
		)
	}
}

export default Newpalettenameform;