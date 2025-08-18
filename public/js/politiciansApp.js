// Get the course data from the database
$(function() {
    let data;
    $( "#modal-button" ).on( "click", function() {
        $( ".modal-body" ).html(" ");
         $.get("api/politicians", (results = {}) => {
            data = results.data;
            if (!data || !data.politicians) return;
            data.politicians.forEach((politician) => {
                $(".modal-body").append(
                    `<div>
                    <div class="politician-name">
                     ${politician.name.first}
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

// this prints out the associated courses for the user that has logged in, as a table1
let printPoliticianData = () => {
       $( "#politicians-button" ).on( "click", function() {
        $(".modal-footer").text("");
         $.get("api/politicians/userpoliticians", (results = {}) => {
             data = results.data;
            $( ".modal-footer" ).append(`
            <div>
            Sinun tiimisi:
            </div>
        <table class="table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Cost</th>

        </tr>
    </thead>
            `);
             data.politicians.forEach((politician) => {
                $(".modal-footer").append(
                    `
                    <table class="table">

    <tbody>

        <tr>
            <td>
                ${politician._id}

            </td>


        </tr>

    </tbody>
</table>


                    `
                );
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
}

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
