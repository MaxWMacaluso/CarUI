//INPUT:
    //input_svg_map - (mapped_key : val_arr)
        //val_arr = [img, element_to_change, to_inc]
    //button_pressed - keyboard input
//OUTPUT:
    //Working with oass by reference so can use void/Unit
function alterSVG(input_svg_map, button_pressed)
{
    var val_arr = input_svg_map.get(button_pressed)
    var img = val_arr[0]
    var element = img.getElementById(val_arr[1]) //TODO: look up vs .document
    var element_content = element.textContent
    var to_inc = val_arr[2]

    //Converting to number
    element_content = Number(element_content)

    if (to_inc)
    {
        //Increase
        element_content++
    }

    else
    {
        //Decrease
        element_content--
    }

    

    //Converting back to string and equating to new value
    element_content = String(element_content)
    element.textContent = element_content

    //function returns undefined by default
}
