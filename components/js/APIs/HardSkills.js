import { HardSkills } from "../exports/HardSkills.js";
import { Consumer } from "../classes/Consumer.js";

let contentTemplate = ( object ) => `
<li>
	<div class="circle">
		<img src="components/static/img/skills/${ object.skill }" alt="">
	</div>
	<div class="name-skill">
	${ object.skillName ? object.skillName : object.skill.split( "." )[ 0 ].replace( /-/g, ' ' ) }
	</div>
</li>
`;

new Consumer( "#skills-container", contentTemplate, HardSkills );