// $(document).ready(function() {
//     if (localStorage.getItem("score") === 0 || localStorage.getItem("score") === "0" || localStorage.getItem("score") === null || localStorage.getItem("score") === undefined) {
//         $('#canvas').hide();
//         $('.results').hide();
//     } else {
//         $('.start').hide();
//     }

//     $('.play').on('click', function() {
//         $('.start').hide();
//         $('#canvas').show();
//         playing = true;
//         setInterval(function() {
//         if (lives <= 0 && playing || level === 11) {
//             // Store
//             localStorage.setItem("score", score);
//             // Retrieve
//             newScore = localStorage.getItem("score");
//             playing = false;
//             $('.results').show();
//          };
//         }, 200);
//     });

//     $(document).on('click', '.again', function() {
//         localStorage.setItem("score", 0);
//     })
// })