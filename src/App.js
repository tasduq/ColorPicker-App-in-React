import React , {Component} from  'react';
import Seedcolors from './Seedcolors'
import Palette from './Palette'
import genratePallete from './Colorhelper'
import Palettelist from './Palettelist'
import Morecolor from './Morecolor'
import Newpalette from './Newpalette'
import {Switch , Route} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import './App.css';

class App extends Component {
	
	constructor(props){
		super(props)
		const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
		this.state = {
			palettes : (savedPalettes || Seedcolors),
			defaultNewPalette: Seedcolors[0]
		}
		this.findPalette = this.findPalette.bind(this)
		this.savePalette = this.savePalette.bind(this)
		this.deletePalette = this.deletePalette.bind(this)
	}
	findPalette(id){
		return this.state.palettes.find(palette => {
			return palette.id === id
		})
	}
	
	
	
	async savePalette(newPalette){
		await this.setState(st => {
			return{
				palettes : [...st.palettes , newPalette]
			}
		})
		this.syncPalettes()
		 
	}
	
	async deletePalette(paletteId){
		await this.setState(st => {
			return{
				palettes: st.palettes.filter(palette => palette.id !== paletteId)
			}
		})
		this.syncPalettes()
		console.log(this.state.defaultNewPalette)
	}
	
	syncPalettes(){
		window.localStorage.setItem("palettes" , JSON.stringify(this.state.palettes))
	}
	
	render(){
		
	
		
	return (
		  <Switch>
			<Route
				exact  path = "/palette/new"  
				render = {(routeProps) => 
		        <Newpalette 
					savePalette = {this.savePalette}  
					{...routeProps} 
					palettes = {this.state.palettes}
					defaultNewPalette = {this.state.defaultNewPalette}
				/> } 
			/>
			  <Route 
				  exact path = "/" 
				  render = {(routeProps) => 
		          <Palettelist 
				  palettes = {this.state.palettes} 
				  {...routeProps} 
				  deletePalette = {this.deletePalette}
				  />} 
			  />
			  <Route 
				  exact path = "/palette/:id" 
				  render = {(routeProps) => <Palette Seedcolors =                                                                                 {genratePallete(this.findPalette(routeProps.match.params.id))} {...routeProps} />} 
		       />
			<Route 
				exact path = "/palette/:paletteId/:color"  
				render = {(routeProps) => <Morecolor pallete =                                                                               {genratePallete(this.findPalette(routeProps.match.params.paletteId))} color = {routeProps.match.params.color}                        /> }
			/>
			<Route render = {(routeProps) => 
		          <Palettelist 
				  palettes = {this.state.palettes} 
				  {...routeProps} 
				  deletePalette = {this.deletePalette}
				  />} 
			/>
		  </Switch>
		
	  );	
	}
}

export default App;
