// Get the course data from the database
$(function() {
    let data;
    $( "#modal-button" ).on( "click", function() {
        $( ".modal-body" ).text("");
         $.get("api/politicians", (results = {}) => {
            data = results.data;
            if (!data || !data.politicians) return;
            data.politicians.forEach((politician) => {
                $(".modal-body").append(
                    `
                    <div class="gridOfPoliticians">
                        <div class="politicians">
                            <div class="politician-picked" data-id="${politician._id}>
                                ${politician.joined}
                            </div>
                            <div class="photo-politician">
                                 <a href="/politicians/${politician._id}"> <img class="photo" src="/images/mps/${politician._id}.jpg" height="75" width="51"></a>
                            </div>
                            <div class="politician-name">
                                ${politician.name.first} ${politician.name.last}
                            </div>
                            <div>
                            <button class="pick-button" data-id="${politician._id}">Valitse tiimiisi</button>
                            </div>
                        </div>
                    </div>`
                );
            });
        }).then(() => {
             addPickButtonListener()
        }).then(() => {
            printPoliticianData();
        });
        });
    });

// When .pick-button is clicked it gains class .clicked. When there is a button with a .clicked class
// it is assigned to $button variable. This button variable can then be modified and user notified
// that the politician has been selected and added to user's team

let addPickButtonListener = () => {
    $(document).on("click", ".pick-button", function() {
        $(this).addClass("clicked");
        var politicianId = $(this).attr("data-id");
        let $button = $(".clicked");
        $.get(`api/politicians/${politicianId}/pick`, (results = {}) => {
            let data = results.data;
            if (data && data.success) {
                $button
                .text("Valittu")
                .addClass("picked-button")
                .removeClass("pick-button");
            } else {
                $button
                .text("Yritä uudestaan");
            }
        });
    });
};

// this prints out the associated courses for the user that has logged in, as a table
// waits for a click on #politicians-button, then empties the .modal-body div
// and finally fetches the current logged in users politicians from the database

    $(function() {
    let data;
    $( "#politicians-button" ).on( "click", function() {
        $( ".modal-body" ).text("");
        $.get("api/politicians/userpoliticians", (results = {}) => {
            data = results.data;
            data.politicians.forEach((politician) => {
                $(".modal-body").append(
                `
                <div class="center">
                    <ul>
                        <li>
                            <h2>
                            ${politician.name.first} ${politician.name.last}
                            </h2>
                        </li>
                        <li>
                            <a href="/politicians/${politician._id}"> <img class="photo" src="/images/mps/${politician._id}.jpg" height="75" width="51"></a>
                        </li>
                        <li>
                            <a href="/politicians/${politician.party}/showParty"><img class="photo" src="/images/logos/${politician.party}.png" height="51" width="51"></a>
                        </li>
                        <li>
                            <a href="/politicians/${politician.party}/showParty">${politician.party} </a>
                        </li>
                        <li>
                            Saadut pisteet: ${politician.points.won}
                        </li>
                    </ul>
                <div>
                    `
                );
            });
            });
        });
    });


// $(function() {
//              $(document).on("click", "s-clicked", function() {


//                 $( ".modal-footer" ).text("sbutton clicked");


//              });
//             });

// $(function() {
//     $( "#close-button" ).on( "click", function() {
//    $( ".modal-footer" ).text( "JEEEEEEEEEEEEEEE" );

//     });
// });
