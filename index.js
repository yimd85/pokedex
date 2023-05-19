const $form = $("form");

$form.on("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);    
    const pokemon = formData.get("pokemon");
    
    $('[name="pokemon"]')[0].value = '';

    const pokeapi = "https://pokeapi.co/api/v2/pokemon/";
    const $result = $('.ds-middle_result');
    $result.empty();
    $result.html(`<div>Loading...</div>`);
    const $middle = $('.ds-middle_screen');
    $middle.empty();

    fetch(`${pokeapi}${pokemon.toLowerCase()}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            $result.empty();
            $result.html(`
                <div><b>name:&nbsp;</b>${data.name}</div>
                <div><b>id:&nbsp;</b>${data.id}</div>
                <div><b>weight:&nbsp;</b>${data.weight}</div>
                <div><b>types:&nbsp;</b>${data.types.map(v => v.type.name).toString()}</div>
            `);
            $middle.empty();
            $middle.html(
                `<img src=${data.sprites.front_shiny || data.sprites.front_default} alt=${data.name}>`
            )
        })
        .catch(() => alert('invalid pokemon'));
})