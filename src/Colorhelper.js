import chroma from 'chroma-js';
const levelsOfColor = [50 , 100 , 200 , 300 , 400 , 500 , 600 , 700 , 800 , 900]

function genratePalette(starterPalette){
	let newPalette = {
		paletteName:starterPalette.paletteName,
		id:starterPalette.id,
		emoji:starterPalette.emoji,
		colors:{}
	}
	
	for(let level of levelsOfColor){
		newPalette.colors[level] = [];
	}
	
	for(let color of starterPalette.colors){
		
		let scale = genrateScale(color.color , 10).reverse()
		for(let i in scale){
			
			newPalette.colors[levelsOfColor[i]].push({
				name: `${color.name} ${levelsOfColor[i]}`,
				id:color.name.toLowerCase().replace(/ /g , "-"),
				hex:scale[i],
				rgb: chroma(scale[i]).css(),
				rgba: chroma(scale[i]).css().replace(")" , ",1.0)").replace("rgb" , "rgba")
				
			})
		}
	}
	
	return newPalette
	
}

function getRange(hexColor){
	const end = "#fff";
	return [
		chroma(hexColor)
		.darken(1.4)
		.hex(),
		hexColor,
		end
	];
}

function genrateScale(hexColor,shadesNumber ){
	return chroma.scale(getRange(hexColor)).mode("lab").colors(shadesNumber)
}

export default genratePalette;


