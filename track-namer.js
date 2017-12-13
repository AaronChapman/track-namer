//pull random word data from list of words
function setup() {
    $.get("track-namer-words.txt", function(data) {
        array = data.split(/\r\n|\r|\n/);
    });
}

//adds a generated track name as a paragraph tag to the content area, then scrolls to the bottom of the content area
function append(track_name) {
    var new_track_name = document.createElement('p');
    var new_track_name_text = document.createTextNode(track_name);

    track_names.appendChild(new_track_name);
    new_track_name.appendChild(new_track_name_text);

    $("#content").scrollTop($("#content")[0].scrollHeight);
}

//selections a random word from the list
function random_word_selection() {
    var word_choice = Math.floor(Math.random() * 3000) + 1;

    return array[word_choice].toString();
}

//uses random integers to determine number the of words in the track name, as well the frequency of common words
function generate_track_name() {
    if (auto_generate_on) {
        if (additional_chance > 45) {
            additional_chance = Math.floor(Math.random() * 100) + 1;

            if (additional_chance > 65) {
                additional_chance = Math.floor(Math.random() * 100) + 1;

                if (additional_chance > 75) {
                    additional_chance = Math.floor(Math.random() * 100) + 1;

                    if (additional_chance > 70) {
                        additional_chance = Math.floor(Math.random() * 100) + 1;

                        if (additional_chance > 65)
                            for (i = 0; i < 6; i++)
                                name_string = name_string + " " + random_word_selection();
                        else {
                            for (i = 0; i < 5; i++)
                                name_string = name_string + " " + random_word_selection();
                        }
                    } else {
                        for (i = 0; i < 4; i++)
                            name_string = name_string + " " + random_word_selection();
                    }
                } else {
                    for (i = 0; i < 3; i++)
                        name_string = name_string + " " + random_word_selection();
                }
            } else {
                for (i = 0; i < 2; i++)
                    name_string = name_string + " " + random_word_selection();
            }
        } else if (additional_chance < 18) {
            var temp_word = Math.floor(Math.random() * 3) + 1;

            name_string = extras[temp_word - 1].toString() + name_string + " " + random_word_selection();
        } else {
            name_string = name_string + " " + random_word_selection();
        }
    
        //add generated track name to the content area
        append(name_string);
        //so y'all can't break my shit
        safety_check();

        //always reatset your vaerigetaebles
        name_string = "";
        additional_chance = Math.floor(Math.random() * 100) + 1;
    }
}

//handles user interaction
function auto_generate() {
    if (!auto_generate_on) {
        auto_generate_on = true;

        document.getElementById("auto_generate_button").value = "stop generating";

        generate_track_name();
    } else {
        auto_generate_on = false;

        document.getElementById("auto_generate_button").value = "generate track names";
    }
}

//blah blah blah prevent forest fires yadda yadda soundcloud.com/oylo
function safety_check() {
    if (auto_generate_on) {
        setTimeout(function () {

            if (auto_generate_on) {
                generate_track_name();
            }
        }, 1000);
    }
}