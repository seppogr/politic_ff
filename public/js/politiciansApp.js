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
                    `<div>
                    <div class="politician-name">
                     ${politician.name.first} ${politician.name.last}
                    </div>
                    <div class="politician-picked" data-id="${politician._id}>
                      ${politician.joined}
                    </div>
                    <div class="course-description">

                    </div>
                    <div>
                    <button class="pick-button" data-id="${politician._id}">Valitse tiimiisi</button>
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

//
   //<button class='${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}>${course.joined ? "Joined" : "Join"}
     //                 </button>
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
//let printPoliticianData = () => {
    $(function() {
    let data;
       $( "#politicians-button" ).on( "click", function() {
        $( ".modal-body" ).text("");
         $.get("api/politicians/userpoliticians", (results = {}) => {
             data = results.data;

            $( ".modal-body" ).append(`
            <div>
            Sinun tiimisi
            </div>


            <thead>
                <tr>
                    <th>Nimi</th>
                    <th>Kuva</th>
                    <th>Puolue</th>
                    <th>Logo</th>
                </tr>
            </thead>


            `);
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




        //     for (let i = 0; i < data.courses.length; i++) {
        //     //if(data.courses[i].joined == true){
        //          $( ".modal-footer" ).append(
        // `
        // <p>
        // Title:
        //  ${JSON.stringify(data.courses[i].title)}
        // </p>

        // <p>
        // Description:
        //  ${JSON.stringify(data.courses[i].description)}
        // </p>

        // <p>
        // Cost:  ${JSON.stringify(data.courses[i].cost)}
        // </p>

        // `
        //         );
        //     }

         });


       // }



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
