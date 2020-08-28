import React , {Component} from 'react'
import Colorbox from './Colorbox'
import Navbar from './Navbar'
import './Palette.css'
class Palette extends Component{
	constructor(props){
		super(props)
		this.state = {
			level:500,
			format:"hex"
		}
		this.handleLevelChange = this.handleLevelChange.bind(this)
		this.changeFormat = this.changeFormat.bind(this)
	}
	handleLevelChange(level){
		this.setState({level : level})
	}
	changeFormat(value){
		this.setState({format : value})
		console.log(value)
	}
	render(){
		let {colors , id , paletteName , emoji} = this.props.Seedcolors
		console.log(this.props.Seedcolors)
		
		return(
			<div className = "Palette">
				
				<Navbar
					level = {this.state.level} 
					handleLevelChange = {this.handleLevelChange} 
					changeFormat = {this.changeFormat} 
					format = {this.state.format}
					showLevelBar = {true}
				/>
				
				<div className ="Palette-colors">
					{colors[this.state.level].map(colorobj => (
						<Colorbox color ={colorobj[this.state.format]} name ={colorobj.name} moreUrl =                                                  {`/palette/${id}/${colorobj.id}`} moreButton = {true} />
					))}
				</div>
				
				<footer className = "footer">
					{paletteName}
					<span id = "emoji">{emoji}</span>
				</footer>
				
			</div>
		)
	}
}

export default Palette;