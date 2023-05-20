const $searchForm = $(".search");


$searchForm.on("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const pokemon = formData.get("pokemon");
    const pokeapi = "https://pokeapi.co/api/v2/pokemon/";
    const $screen = $(".screen");
    const $result = $(".result");

    // empty out the input field
    $('[name="pokemon"]')[0].value = "";

    //empty out previous results and add a loading indicator
    $screen.empty();
    $result.empty();
    $result.html(`<div>Loading...</div>`);

    // add lower case to the pokemon
    fetch(`${pokeapi}${pokemon.toLowerCase()}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            $screen.html(
                `<img src=${data.sprites.front_shiny || data.sprites.front_default} alt=${data.name}>`
            );

            $result.html(`
                <div><b>name:&nbsp;</b>${data.name}</div>
                <div><b>id:&nbsp;</b>${data.id}</div>
                <div><b>weight:&nbsp;</b>${data.weight}</div>
                <div><b>types:&nbsp;</b>${data.types.map((v) => v.type.name).toString()}</div>
            `);
        })
        // add error handling
        .catch(() => {
            $result.html(`<div > 404 Pokemon not found</div>`);
        });

})
