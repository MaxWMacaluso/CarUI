//Intpus: 
    //svg - svg image that is going to be altered
    //input_key - keyboard button pressed
    //inc_button_map - map (input_button : element_to_change) that contains all elements to be increased
    //dec_button_map - map (input_button : element_to_change) that contains all elements to be decreased
//Outputs: 
    //Outputs altered svg object
function alter_svg(svg, input_button, inc_button_map, dec_button_map)
{
    //Check if input_button exists in inc_button_map
    if (inc_button_map.has(input_button))
    {
        //Grab the desired id from the svg object
        var value = inc_button_map.get(input_button)
        var element = document.getElementById(value)

        //Store current value of element in element_val
        var element_val = element.textContent
        
        //Converting to number to increase then converting back to string
        element_val = Number(element_val)
        element_val++
        element_val = String(element_val)

        //Sets element_val in svg to new increased value
        element.textContent = element_val
    }

    //Check if exists in dec_button_map
    else if (dec_button_map.has(input_button))
    {
        //Check if input_button exists in inc_button_map
        if (dec_button_map.has(input_button))
        {
            //Grab the desired id from the svg object
            var value = dec_button_map.get(input_button)
            var element = document.getElementById(value)

            //Store current value of element in element_val
            var element_val = element.textContent
            
            //Converting to number to dec then converting back to string
            element_val = Number(element_val)
            element_val--
            element_val = String(element_val)

            //Sets element_val in svg to new dec value
            element.textContent = element_val
        }
    }

    //return altered or unaltered svg
    return svg
}







//NOTE: Right now keeping as reference, may delete later
//However, there is also an issue that the SVG within the object might not have loaded by the time we reach 
//the script element. So we have to make sure we don't try to get the element before the HTML window has loaded
// window.addEventListener("load", function() 
// {
//   //Get the svg object
//   var svg_climate = document.getElementById('climate-wrapper').contentDocument
  
//   //Change location
//   svg_climate.style.top = 500+'px'
//   svg_climate.style.left = 500+'px'
// });

// Keyboard input (set climate text) ------------------------------------------------------------------

//FOR CLIMATE.SVG
//To set numbers for the svg
// var left_num = 68
// var right_num = 68

//FOR RADIO.SVG
// var num = 28

// console.log("HERE1")
// document.addEventListener('keydown', function(event) 
// {
//   console.log("HERE2")

//     //FOR CLIMATE.SVG
//     //Get the svg object
//     //var svg_climate = document.getElementById('climate-wrapper').contentDocument

//     //FOR CLIMATE.SVG
//     //Get left/right number
//     //var left_text = svg_climate.getElementById('left_val')
//     //var right_text = svg_climate.getElementById('right_val')

//     //FOR RADIO.SVG
//     //Get the svg object
//     var svg_radio = document.getElementById('radio-wrapper').contentDocument

//     //FOR RADIO.SVG
//     var volume_text = svg_radio.getElementById('volume_val')
//     // console.log("Hi")

//     //Left
//     if (event.keyCode == 37) 
//     {
//         //FOR RADIO.SVG
//         num--
//         volume_text.textContent = String(num)

//         //FOR CLIMATE.SVG
//         // left_num--
//         // left_text.textContent = String(left_num)
//     }

//     //Right
//     else if (event.keyCode == 39) 
//     {
//         //FOR RADIO.SVG
//         num++
//         volume_text.textContent = String(num)

//         //FOR CLIME.SVG
//         //left_num++
//         //left_text.textContent = String(left_num)
//     }

//     //FOR CLIMATE.SVG
//     // //Down
//     // if (event.keyCode == 40) 
//     // {
//     //     right_num--
//     //     right_text.textContent = String(right_num)
//     // }

//     // //Up
//     // if (event.keyCode == 38) 
//     // {
//     //     right_num++
//     //     right_text.textContent = String(right_num)
//     // }
// });
// //(set climate text) ---------------------------------------------------------------------------------