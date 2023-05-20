const $form = $("form");

$form.on("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const pokemon = formData.get("pokemon");

    $('[name="pokemon"]')[0].value = "";

    const pokeapi = "https://pokeapi.co/api/v2/pokemon/";
    
    const $screen = $(".ds-middle_screen");
    $screen.empty();
    
    const $result = $(".ds-middle_result");
    $result.empty();
    $result.html(`<div>Loading...</div>`);

    fetch(`${pokeapi}${pokemon.toLowerCase()}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            $screen.html(
                `<img src=${data.sprites.front_shiny || data.sprites.front_default} alt=${data.name}>`
            );
            $result.empty();
            $result.html(`
                <div><b>name:&nbsp;</b>${data.name}</div>
                <div><b>id:&nbsp;</b>${data.id}</div>
                <div><b>weight:&nbsp;</b>${data.weight}</div>
                <div><b>types:&nbsp;</b>${data.types.map((v) => v.type.name).toString()}</div>
            `);
        })
        .catch(() => {
            $screen.html(
                `<div class="ds-middle_screen_not-found"> 404 Pokemon not found</div>`
            );
            $result.empty();
        });
});
