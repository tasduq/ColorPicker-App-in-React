import React , {Component} from 'react';
import Colorbox from './Colorbox';
import Navbar from './Navbar';
import {Link} from 'react-router-dom'

class Morecolor extends Component{
	constructor(props){
		super(props);
		this.state = {
			format : "hex",
			
		}
		this._shades = this.getShades(this.props.pallete , this.props.color);
		this.changeFormat = this.changeFormat.bind(this)
	}
	
	getShades(palleteColors , colorId){
		let shades = [];
		let allColors = palleteColors.colors;
		for(let key in allColors){
			shades = shades.concat(
				allColors[key].filter((color) => {
					if(color.id === colorId){
						return color
					}
				})
			)
		}
		
		return shades.slice(1);
	}
	
	changeFormat(value){
		this.setState({format : value})
	}
	
	
	
	render(){
		let {paletteName , emoji , id} = this.props.pallete
		return(
			<div className = " Morecolor Palette">
				<Navbar
					changeFormat = {this.changeFormat} 
					format = {this.state.format}
					showLevelBar = {false}
				/>
				
				<div className ="Palette-colors">
						{this._shades.map(colorobj => (
							<Colorbox color ={colorobj[this.state.format]} name ={colorobj.name} moreButton = {false}  />
						))}
					<div className = "go-back Color-box">
						<Link to = {`/palette/${id}`} className = "back-button">Go Back</Link> 
					</div>
				</div>
				
				<footer className = "footer">
					{paletteName}
					<span id = "emoji">{emoji}</span>
				</footer>
			</div>
			
		)
	}
}

export default Morecolor;