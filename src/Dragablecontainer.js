import React  from 'react'
import Dragablecolorbox from './Dragablecolorbox';
import {SortableContainer} from 'react-sortable-hoc';

// const Dragablecontainer = SortableContainer(({colors , removeBox})(
// 	return(
// 		<div style = {{height : "100%"}}>
// 			 {colors.map(color => (
// 				  <Dragablecolorbox color  = {color.color} name= {color.name} removeBox = {() => removeBox(color.name)} />
// 			  ))}
// 		</div>
// 	)
// )
// )

const Dragablecontainer = SortableContainer(({colors , removeBox}) => {
  return (
    <div style = {{height : "100%"}}>
			 {colors.map((color , i) => (
				  <Dragablecolorbox index = {i} color  = {color.color} name= {color.name} removeBox = {() => removeBox(color.name)} />
			  ))}
	</div>
  );
});

export default Dragablecontainer;